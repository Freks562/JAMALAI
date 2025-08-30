import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ output: 'Missing API key.' }, { status: 500 });
    }

    const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

    const response = await fetch(`${url}?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    });

    const data = await response.json();
    const output = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Gemini had no response.';

    return NextResponse.json({ output });
  } catch (err) {
    console.error('Gemini Error:', err);
    return NextResponse.json({ output: 'JamalAII ran into an error.' }, { status: 500 });
  }
}