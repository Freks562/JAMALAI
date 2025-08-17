'use client';

import { useState } from 'react';

export default function JamalAIBot() {
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
      <h1 className="text-4xl font-bold text-cyan-400 text-center mb-4">
        🗣️ Talk to JamalAI
      </h1>
      <p className="text-lg text-gray-400 text-center max-w-2xl mb-6">
        Ask questions, get answers, build projects—24/7 street-smart AI.
      </p>

      <form onSubmit={handleSubmit} className="w-full max-w-xl bg-gray-900 p-6 rounded-2xl shadow-xl">
        <label className="block mb-2 text-sm text-gray-400">Ask JamalAI anything:</label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={4}
          className="w-full p-4 rounded-lg bg-black text-white border border-cyan-500 placeholder-gray-500"
          placeholder="Example: Write a credit dispute letter for collections"
        />
        <button
          type="submit"
          className="mt-4 w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-6 rounded-xl transition"
          disabled={loading}
        >
          {loading ? 'JamalAI Typin…' : '🎤 Ask JamalAI'}
        </button>
      </form>

      {response && (
        <div className="mt-6 w-full max-w-xl bg-gray-800 p-4 rounded-lg shadow border border-cyan-700">
          <h2 className="text-md text-cyan-400 font-bold mb-2">🧠 JamalAI Responded:</h2>
          <p className="text-gray-300 whitespace-pre-line">{response}</p>
        </div>
      )}

      <footer className="mt-10 text-sm text-gray-600 text-center">
        Built by JamalAI · Powered by Gemini
      </footer>
    </main>
  );
}