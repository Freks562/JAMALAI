'use client';

import { useState } from 'react';

export default function CreditRepair() {
  const [issue, setIssue] = useState('');
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
        body: JSON.stringify({ prompt: `Write a dispute letter about this credit issue: ${issue}` }),
      });

      const data = await res.json();
      setResponse(data.output || 'No response from JamalAI.');
    } catch (err) {
      setResponse('Error talking to JamalAI.');
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl md:text-5xl font-bold text-green-400 text-center mb-4">
        💳 JAI Credit Repair
      </h1>

      <p className="text-lg text-gray-300 text-center max-w-2xl mb-6">
        Fix your credit with AI-generated dispute letters, auto tracking, and expert-mode tools. Street-smart, veteran-built, and hands-free.
      </p>

      <form onSubmit={handleSubmit} className="bg-gray-900 p-6 rounded-2xl shadow-xl w-full max-w-xl">
        <label className="block mb-2 text-sm text-gray-400">Credit Issue:</label>
        <textarea
          value={issue}
          onChange={(e) => setIssue(e.target.value)}
          placeholder="Example: Charged-off credit card from 2021 showing incorrect balance"
          className="w-full p-4 rounded-lg bg-black text-white border border-green-500 placeholder-gray-500"
          rows={5}
        />
        <button
          type="submit"
          disabled={loading}
          className="mt-4 w-full bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-6 rounded-xl transition"
        >
          {loading ? 'Generating...' : '🧠 Generate Dispute Letter'}
        </button>
      </form>

      {/* Stripe Payment Plans */}
      <div className="mt-10 w-full max-w-xl space-y-3">
        <a
          href="https://buy.stripe.com/test_Pro1999"
          className="block w-full bg-green-600 hover:bg-green-500 text-white text-center font-bold py-3 px-6 rounded-xl"
        >
          🧠 Go Pro — $19.99/month
        </a>
        <a
          href="https://buy.stripe.com/test_BossMode59"
          className="block w-full bg-yellow-600 hover:bg-yellow-500 text-white text-center font-bold py-3 px-6 rounded-xl"
        >
          💼 Boss Mode — $59 One-Time
        </a>
        <a
          href="https://buy.stripe.com/test_VetPlan1"
          className="block w-full bg-gray-700 hover:bg-gray-600 text-white text-center font-bold py-3 px-6 rounded-xl"
        >
          🎖️ Vet Plan — $1/month
        </a>
        <a
          href="https://buy.stripe.com/test_VetBoss5"
          className="block w-full bg-blue-700 hover:bg-blue-600 text-white text-center font-bold py-3 px-6 rounded-xl"
        >
          🎖️ Boss Mode for Vets — $5 One-Time
        </a>
      </div>

      {/* Response Display */}
      {response && (
        <div className="mt-8 w-full max-w-xl bg-gray-800 p-4 rounded-lg shadow border border-green-700">
          <h2 className="text-md text-green-400 font-bold mb-2">📄 Dispute Letter Draft:</h2>
          <p className="text-gray-300 whitespace-pre-line">{response}</p>
        </div>
      )}

      {/* Donation Link */}
      <a
        href="https://buy.stripe.com/test_donationlink"
        className="text-sm text-gray-400 underline mt-6 block text-center"
      >
        💖 Support JamalAI with a donation
      </a>

      <footer className="mt-10 text-sm text-gray-600 text-center">
        Built by JamalAI · $19.99 Pro · $1 Vet Plan · Free Street Credit Mode
      </footer>
    </main>
  );
}