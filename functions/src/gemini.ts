import { onRequest } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";

export const geminiChat = onRequest(
  { secrets: ["GEMINI_API_KEY"], region: "us-central1" },
  async (req, res) => {
    try {
      const { GoogleGenerativeAI } = await import("@google/generative-ai");
      const apiKey = process.env.GEMINI_API_KEY as string;
      const genAI = new GoogleGenerativeAI(apiKey);
      const body = (req.body ?? {}) as { message?: string };
      const userMsg = (body.message || "Say hi").toString();
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(userMsg);
      const text = result.response.text();
      res.status(200).json({ ok: true, message: text });
    } catch (err: any) {
      const msg = String(err?.message || err);
      const status = Number(err?.status) || 500;
      logger.error("geminiChat error", { status, msg });
      res.status(status).json({ ok: false, error: msg });
    }
  }
);
