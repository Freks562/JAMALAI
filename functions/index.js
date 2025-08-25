const { onRequest } = require('firebase-functions/v2/https');
const { logger } = require('firebase-functions');
const admin = require('firebase-admin');
const Stripe = require('stripe');

admin.apps.length ? admin.app() : admin.initializeApp();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2024-06-20' });

exports.stripeWebhook = onRequest({ region:'us-central1', cors:false, secrets:['STRIPE_WEBHOOK_SECRET','STRIPE_SECRET_KEY'] }, async (req,res)=>{
  if (req.method !== 'POST') { res.set('Allow','POST'); return res.status(405).send('Method Not Allowed'); }
  const sig = req.headers['stripe-signature'];
  try {
    const event = stripe.webhooks.constructEvent(req.rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET);
    logger.info('stripe event', { id:event.id, type:event.type });
    return res.status(200).json({ received:true, id:event.id, type:event.type });
  } catch (e) {
    logger.error('verify fail', { msg:e.message });
    return res.status(400).send(`Webhook Error: ${e.message}`);
  }
});
