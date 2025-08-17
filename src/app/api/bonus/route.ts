// src/app/api/bonus/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  const { email, bonus } = await req.json();

  if (!email || typeof bonus !== 'number') {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  const { data: user, error } = await supabase
    .from('users')
    .select('coins')
    .eq('Email', email)
    .single();

  if (error || !user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const newBalance = user.coins + bonus;

  const { error: updateError } = await supabase
    .from('users')
    .update({ coins: newBalance })
    .eq('Email', email);

  if (updateError) {
    return NextResponse.json({ error: 'Failed to apply bonus' }, { status: 500 });
  }

  return NextResponse.json({ success: true, newBalance });
}