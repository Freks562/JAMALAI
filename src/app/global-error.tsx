"use client";
export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <html><body>
      <h2>Something went wrong globally</h2>
      <pre>{error.message}</pre>
      <button onClick={() => reset()}>Reload app</button>
    </body></html>
  );
}