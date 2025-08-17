// src/app/api/play-game/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 });
  }

  const { data: user, error } = await supabase
    .from('users')
    .select('coins, wins')
    .eq('Email', email)
    .single();

  if (error || !user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  if (user.coins < 1) {
    return NextResponse.json({ error: 'Insufficient coins' }, { status: 402 });
  }

  const { error: updateError } = await supabase
    .from('users')
    .update({
      coins: user.coins - 1,
      wins: (user.wins || 0) + 1, // Add 1 to wins for leaderboard
    })
    .eq('Email', email);

  if (updateError) {
    return NextResponse.json({ error: 'Failed to update balance' }, { status: 500 });
  }

  return NextResponse.json({
    success: true,
    remainingCoins: user.coins - 1,
    newWins: (user.wins || 0) + 1,
  });
}