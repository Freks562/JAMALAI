'use client';

import { useState } from 'react';

export default function FreksFrame() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setResponse('');

    try {
      const res = await fetch('/api/gemini', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      setResponse(data.output || 'No response from JamalAI.');
    } catch (error) {
      setResponse('Error talking to JamalAI.');
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold text-cyan-400 text-center mb-4">🎬 FreksFrame</h1>
      <p className="text-lg text-gray-400 text-center max-w-2xl mb-6">
        Paste your prompt below to generate an AI tutorial or video. Our tool handles it all—<br />from script to visuals.
      </p>

      <form onSubmit={handleSubmit} className="w-full max-w-xl bg-gray-900 p-6 rounded-2xl shadow-xl">
        <label className="block mb-2 text-sm text-gray-400">AI Prompt:</label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={4}
          className="w-full p-4 rounded-lg bg-black text-white border border-cyan-500 placeholder-gray-500"
          placeholder="Example: Make a video tutorial explaining how to fix credit with urban slang and subscribe CTA"
        />
        <button
          type="submit"
          className="mt-4 w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-6 rounded-xl transition"
          disabled={loading}
        >
          {loading ? 'Building…' : '🎥 Build Video'}
        </button>
      </form>

      {/* FreksFrame Stripe Buttons */}
      <div className="mt-6 w-full max-w-xl space-y-3">
        <a
          href="https://buy.stripe.com/test_bIY7vu9Yo6lz6KA6op"
          className="block w-full bg-cyan-600 hover:bg-cyan-500 text-white text-center font-bold py-3 px-6 rounded-xl"
        >
          🎞️ Buy 1 Video Credit — $0.99
        </a>
        <a
          href="https://buy.stripe.com/test_6oE5nf9Yo4zT7TOfZ0"
          className="block w-full bg-purple-600 hover:bg-purple-500 text-white text-center font-bold py-3 px-6 rounded-xl"
        >
          ♾️ Unlimited Monthly — $7.99
        </a>
      </div>

      {response && (
        <div className="mt-6 w-full max-w-xl bg-gray-800 p-4 rounded-lg shadow border border-cyan-700">
          <h2 className="text-md text-cyan-400 font-bold mb-2">📼 Video Script Output:</h2>
          <p className="text-gray-300 whitespace-pre-line">{response}</p>
        </div>
      )}

      <footer className="mt-10 text-sm text-gray-600 text-center">
        FreksFrame by JamalAI · Urban-optimized AI tools
      </footer>
    </main>
  );
}