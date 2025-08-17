'use client';

export default function VetRight() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl md:text-5xl font-bold text-purple-400 text-center mb-4">
        🎖️ VetRight
      </h1>
      <p className="text-lg text-gray-300 text-center max-w-2xl mb-6">
        File your VA claim, track your case, and get the back pay you deserve.
        Built by veterans. For veterans. Only 3% when you win.
      </p>

      <div className="bg-gray-900 p-6 rounded-2xl shadow-xl w-full max-w-xl">
        <label className="block mb-2 text-sm text-gray-400">What’s your issue?</label>
        <textarea
          placeholder="Example: PTSD claim denied, but I have new evidence from my therapist and VA hospital"
          className="w-full p-4 rounded-lg bg-black text-white border border-purple-500 placeholder-gray-500"
          rows={5}
        />

        <button className="mt-4 w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 px-6 rounded-xl transition">
          🧾 Start My Claim
        </button>
      </div>

      <footer className="mt-10 text-sm text-gray-600 text-center">
        VetRight by JamalAI • Free to start · Pay only 3% if you win backpay
      </footer>
    </main>
  );
}