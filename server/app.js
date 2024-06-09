require("dotenv").config();
const express = require("express");
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");
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

app.use(express.json());

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
  }
};

app.post("/conversation", async (req, res) => {
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
    console.error("Error processing query:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
