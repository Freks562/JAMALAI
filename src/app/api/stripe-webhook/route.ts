// src/app/api/stripe-webhook/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
});

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  const sig = req.headers.get('stripe-signature')!;
  const rawBody = await req.text();

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error('Webhook signature verification failed.', err);
    return new NextResponse('Webhook Error', { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const coins = parseInt(session.metadata?.coins || '0');
    const email = session.customer_email;

    if (email && coins) {
      const { data: existingUser } = await supabase
        .from('users')
        .select('*')
        .eq('Email', email)
        .single();

      if (existingUser) {
        await supabase
          .from('users')
          .update({ coins: existingUser.coins + coins })
          .eq('Email', email);
      } else {
        await supabase.from('users').insert([{ Email: email, coins }]);
      }

      console.log(`✅ Credited ${coins} coins to ${email}`);
    }
  }

  return new NextResponse('Webhook received', { status: 200 });
}