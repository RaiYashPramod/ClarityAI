require("dotenv").config();
const express = require("express");
const puppeteer = require("puppeteer");
const rateLimit = require('express-rate-limit')
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const sharp = require("sharp");
const app = express();
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const generationConfig = {
  stopSequences: ["red"],
  maxOutputTokens: 150,
  temperature: 0.9,
  topP: 0.5,
  topK: 16,
};

const apiLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 10, // limit each IP to 100 requests per windowMs
	message: 'Too many requests right now, please try again later.'
})

app.use(express.json());
app.use('/api/', apiLimiter)

app.use(
  cors({
    origin: "*",
  })
);

const captureScreenshot = async (url) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  const snapShotBuffer = await page.screenshot({ fullPage: true });
  await browser.close();
  // fs.writeFileSync('screenshot.png', snapShotBuffer);
  const resizedBuffer = await sharp(snapShotBuffer)
    .resize({ width: 1280, withoutEnlargement: true })
    .toBuffer();

  return resizedBuffer;
};

let chatHistory = [];

const queryModel = async (query, image) => {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const pic = {
    inlineData: {
      data: Buffer.from(image).toString("base64"),
      mimeType: "image/png",
    },
  };
  const history = chatHistory
    .map((entry) => `Q: ${entry.query}\nA: ${entry.response}`)
    .join("\n\n");
  console.log(history);
  console.log(chatHistory);
  const prompt = `Here is the context of past questions asked by the user and the responses provided:\n\n${history}\n\nNow, based on the image provided, find the best solution for the user's query and keep the response precise and on point for the follow up questions. The query is: ${query}.`;

  try {
    const result = await model.generateContent([prompt, pic]);

    const response = result.response;
    const text = response.text();
    chatHistory.push({ query, text });
    return text;
  } catch (error) {
    console.error("Error querying model:", error);
    throw new Error("Failed to query the model. Please try again later.");
  }
};

app.post("/api/conversation", async (req, res) => {
  try {
    const { url, query } = req.body;
    if (!query) {
      return res.status(400).send({ error: "Query is required." });
    }

    if (!url) {
      return res.status(404).send({ error: "URL not found." });
    }

    const image = await captureScreenshot(url);
    const response = await queryModel(query, image);
    res.send({ response });
  } catch (error) {
    if (error.message.includes("404")) {
      return res.status(404).send({ error: "Failed to capture screenshot. The URL might be invalid." });
    } else if (error.message.includes("Failed to query the model")) {
      return res.status(500).send({ error: "Internal Server Error: Could not process the query." });
    } else {
      console.error("Unhandled error:", error);
      res.status(500).send({ error: "Internal Server Error: An unexpected error occurred." });
    }
  }
});

const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
