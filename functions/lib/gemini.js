import { onRequest } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
export const geminiChat = onRequest({ secrets: ["GEMINI_API_KEY"], region: "us-central1" }, async (req, res) => {
    var _a;
    try {
        const { GoogleGenerativeAI } = await import("@google/generative-ai");
        const apiKey = process.env.GEMINI_API_KEY;
        const genAI = new GoogleGenerativeAI(apiKey);
        const body = ((_a = req.body) !== null && _a !== void 0 ? _a : {});
        const userMsg = (body.message || "Say hi").toString();
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(userMsg);
        const text = result.response.text();
        res.status(200).json({ ok: true, message: text });
    }
    catch (err) {
        const msg = String((err === null || err === void 0 ? void 0 : err.message) || err);
        const status = Number(err === null || err === void 0 ? void 0 : err.status) || 500;
        logger.error("geminiChat error", { status, msg });
        res.status(status).json({ ok: false, error: msg });
    }
});
//# sourceMappingURL=gemini.js.map