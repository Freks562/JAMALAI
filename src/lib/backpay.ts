// temporary stub so pages compile
export type BackpayInput = { rating: number; dependents: number; months: number };
export type BackpayResult = { estimate: number };

export async function calculateBackpay(_input: BackpayInput): Promise<BackpayResult> {
  return { estimate: 0 }; // TODO: replace with real logic
}