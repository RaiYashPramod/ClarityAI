import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";
import puppeteer from "puppeteer";
import sharp from "sharp";
import rateLimit from 'express-rate-limit';

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
  max: 10, // limit each IP to 10 requests per windowMs
  message: 'Too many requests right now, please try again later.'
});

export const config = {
  api: {
    bodyParser: true,
  },
};

let chatHistory = [];

const captureScreenShot = async (url) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  const snapShotBuffer = await page.screenshot({ fullPage: true })
  await browser.close();
  const resizedBuffer = await sharp(snapShotBuffer)
    .resize({ width: 1280, withoutEnlargement: true })
    .toBuffer();

  return resizedBuffer;
}

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
  const prompt = `Here is the context of past questions asked by the user and the responses provided:\n\n${history}\n\nNow, based on the image provided, find the best solution for the user's query and keep the response precise and on point for the follow-up questions. The query is: ${query}.`;

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

export async function POST(req) {
  try {
    const { query, url } = await req.json();
    if (!query) {
      return NextResponse.json({error: 'Query is required'}, {status: 400});
    }

    if (!url) {
      return NextResponse.json({error: 'URL is required'}, {status: 400});
    }

    const image = await captureScreenShot(url);
    const response = await queryModel(query, image);
    return NextResponse.json({ response }, { status: 200 });
  } catch (error) {
    if (error.message.includes("404")) {
      return NextResponse.json({ error: "Failed to capture screenshot. The URL might be invalid." }, { status: 404 });
    } else if (error.message.includes("Failed to query the model")) {
      return NextResponse.json({ error: "Internal Server Error: Could not process the query." }, { status: 500 });
    } else {
      console.error("Unhandled error:", error);
      return NextResponse.json({ error: "Internal Server Error: An unexpected error occurred." }, { status: 500 });
    }
  }
}