exports.stripeWebhook = onRequest(
  { region: 'us-central1' },
  async (req, res) => {
    if (req.method !== 'POST') {
      res.set('Allow', 'POST');
      return res.status(405).send('Method Not Allowed');
    }
    console.log('✅ Stripe webhook hit!');
    return res.status(200).json({ ok: true });
  }
);