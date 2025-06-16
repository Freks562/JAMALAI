import { onRequest } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import { defineSecret } from "firebase-functions/params";
import { GoogleGenerativeAI } from "@google/generative-ai";
const GEMINI_API_KEY = defineSecret("GEMINI_API_KEY");
const MOCK_AI = defineSecret("MOCK_AI");
export const aiChat = onRequest({ secrets: [GEMINI_API_KEY, MOCK_AI], region: "us-central1" }, async (req, res) => {
    var _a;
    try {
        const mock = (MOCK_AI.value() || "0").trim() === "1";
        const body = ((_a = req.body) !== null && _a !== void 0 ? _a : {});
        const userMsg = (body.message || "Say hi").toString();
        if (mock) {
            res.status(200).json({ ok: true, message: "Hello there friend" });
            return;
        }
        const genAI = new GoogleGenerativeAI(GEMINI_API_KEY.value());
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(userMsg);
        const reply = result.response.text() || "No reply";
        res.status(200).json({ ok: true, message: reply });
    }
    catch (err) {
        const msg = String((err === null || err === void 0 ? void 0 : err.message) || err);
        const status = Number(err === null || err === void 0 ? void 0 : err.status) || (msg.includes("429") ? 429 : 500);
        logger.error("aiChat error", { status, msg });
        res.status(status).json({ ok: false, error: msg });
    }
});
//# sourceMappingURL=ai.js.map