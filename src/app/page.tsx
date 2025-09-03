// src/app/page.tsx
import Link from "next/link";

export default function Home() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">JamalAI</h1>
      <ul className="list-disc pl-6">
        <li><Link className="underline" href="/veterans">Veterans</Link></li>
      </ul>
    </main>
  );
}