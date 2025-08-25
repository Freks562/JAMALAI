export type RatingPoint = { fromISO: string; rating: number };
export type RateTable = Record<string, Record<string, Record<string, number>>>;

export function monthsBetween(a: Date, b: Date): number {
  const m = (b.getFullYear() - a.getFullYear()) * 12 + (b.getMonth() - a.getMonth());
  return Math.max(0, m);
}

export function pickMonthlyRate(
  date: Date,
  rating: number,
  rates: RateTable,
  dependentsKey = "no_dependents"
): number {
  const year = String(date.getFullYear());
  const yr = rates[year];
  if (!yr) return 0;
  const bucket = yr[dependentsKey] || yr["no_dependents"];
  if (!bucket) return 0;
  const v = bucket[String(rating)];
  return typeof v === "number" ? v : 0;
}

export function estimateBackPayUSD(
  effectiveISO: string,
  points: RatingPoint[],
  rates: RateTable,
  dependentsKey = "no_dependents",
  now: Date = new Date()
): number {
  if (!effectiveISO || points.length === 0) return 0;
  const eff = new Date(effectiveISO);
  const sorted = [...points].sort((a,b)=>a.fromISO.localeCompare(b.fromISO));
  let total = 0;
  for (let i=0;i<sorted.length;i++){
    const segStart = new Date(Math.max(eff.getTime(), new Date(sorted[i].fromISO).getTime()));
    const segEnd = i < sorted.length-1 ? new Date(sorted[i+1].fromISO) : now;
    if (segEnd <= segStart) continue;
    const months = monthsBetween(segStart, segEnd);
    const monthly = pickMonthlyRate(segStart, sorted[i].rating, rates, dependentsKey);
    total += months * monthly;
  }
  return Math.round(total);
}