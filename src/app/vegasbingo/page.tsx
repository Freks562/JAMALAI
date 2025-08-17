'use client';

import { useEffect, useState } from 'react';

export default function VegasBingo() {
  const [coins, setCoins] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const userEmail = 'freks562@gmail.com'; // Replace with dynamic user email later

  useEffect(() => {
    // Load user coin balance
    const fetchBalance = async () => {
      const res = await fetch('/api/get-balance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userEmail }),
      });
      const data = await res.json();
      setCoins(data.coins || 0);
    };

    fetchBalance();
  }, []);

  const handlePlay = async () => {
    setLoading(true);

    const res = await fetch('/api/play-game', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: userEmail }),
    });

    const data = await res.json();
    setLoading(false);

    if (data.success) {
      setCoins(data.remainingCoins);
      alert('✅ Game started! Good luck!');
    } else {
      alert(`❌ ${data.error}`);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl md:text-5xl font-bold text-yellow-400 text-center mb-4">
        🎲 Vegas Dot Bingo Cash
      </h1>
      <p className="text-lg text-gray-300 text-center max-w-2xl mb-2">
        Play to win real rewards. Compete in skill-based bingo with urban flair.
      </p>
      {coins !== null && (
        <p className="text-md text-cyan-400 text-center mb-6">🪙 Your Coins: {coins}</p>
      )}

      <div className="w-full max-w-xl bg-gray-900 p-6 rounded-2xl shadow-xl text-center">
        <p className="text-md text-gray-400 mb-4">Game Mode:</p>

        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <button
            className="bg-yellow-600 hover:bg-yellow-500 w-full md:w-1/2 py-3 px-4 rounded-xl font-bold"
            onClick={handlePlay}
            disabled={loading}
          >
            💰 {loading ? 'Starting Game...' : 'Real Money Mode (-1 coin)'}
          </button>
          <button className="bg-gray-700 hover:bg-gray-600 w-full md:w-1/2 py-3 px-4 rounded-xl font-bold">
            🎮 Free Play Mode
          </button>
        </div>
      </div>

      <footer className="mt-10 text-sm text-gray-600 text-center">
        Vegas Dot Bingo Cash by JamalAI • Powered by Dotface Entertainment
      </footer>
    </main>
  );
}