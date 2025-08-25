'use client';
export default function Error({ error, reset }) {
  return (<main><h1>500</h1><pre>{error?.message}</pre><button onClick={()=>reset()}>Retry</button></main>);
}
