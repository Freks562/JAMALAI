import { onRequest } from "firebase-functions/v2/https";

// Minimal webhook function — good for 405 test via Hosting rewrite
export const stripeWebhook = onRequest(
  { region: "us-central1", cors: false, maxInstances: 2 },
  async (req, res) => {
    // Hosting rewrite test: GET -> should yield 405 via function
    if (req.method !== "POST") {
      res.set("Allow", "POST");
      return res.status(405).send("Method Not Allowed");
    }

    // Minimal fast OK (we'll add Stripe verification later)
    console.log("stripeWebhook hit");
    return res.status(200).json({ ok: true });
  }
);