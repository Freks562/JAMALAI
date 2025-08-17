export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl md:text-6xl font-bold text-cyan-400 drop-shadow-lg text-center mb-4">
        JamalAI
      </h1>
      <p className="text-lg md:text-2xl text-gray-300 text-center max-w-xl mb-6">
        Your all-in-one AI homie — mix beats, fix credit, play games, and get veteran help. Hands-free.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
        <a href="/freksframe" className="bg-cyan-800 hover:bg-cyan-600 rounded-2xl p-4 shadow-xl text-center transition">
          🎬 FreksFrame Video Builder
        </a>
        <a href="/creditrepair" className="bg-green-700 hover:bg-green-500 rounded-2xl p-4 shadow-xl text-center transition">
          💳 JAI Credit Repair
        </a>
        <a href="/vegasbingo" className="bg-yellow-600 hover:bg-yellow-500 rounded-2xl p-4 shadow-xl text-center transition">
          🎲 Vegas Dot Bingo Cash
        </a>
        <a href="/vetright" className="bg-purple-700 hover:bg-purple-600 rounded-2xl p-4 shadow-xl text-center transition">
          🎖️ VetRight Legal Help
        </a>
        <a href="/jamalai-bot" className="bg-gray-800 hover:bg-gray-700 rounded-2xl p-4 shadow-xl text-center transition col-span-full">
          🗣️ Talk to JamalAI Bot
        </a>
      </div>

      <footer className="mt-10 text-sm text-gray-600">
        Powered by Dotface Entertainment · Built with Next.js & Tailwind
      </footer>
    </main>
  );
}