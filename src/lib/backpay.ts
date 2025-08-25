export type RatingPoint = { from: string; rating: number };

export type VaRates = {
  schema: string;
  notes?: string;
  [year: string]: any;
};

export type BackpayOptions = {
  baselineFamily: 'no_children' | 'with_children';
  baselineKey:
    | 'veteran_alone' | 'spouse' | 'spouse_one_parent' | 'spouse_two_parents'
    | 'one_parent' | 'two_parents'
    | 'veteran_child_only' | 'spouse_child' | 'spouse_one_parent_child' | 'spouse_two_parents_child'
    | 'one_parent_child' | 'two_parents_child';
  extraUnder18?: number;
  extraOver18School?: number;
  spouseAidAndAttendance?: boolean;
};

function parseISO(d: string): Date {
  return new Date(d + (d.length === 10 ? 'T00:00:00Z' : ''));
}

function monthsBetween(start: Date, end: Date): number {
  const s = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), 1));
  const e = new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), 1));
  const months = (e.getUTCFullYear() - s.getUTCFullYear()) * 12 + (e.getUTCMonth() - s.getUTCMonth());
  return Math.max(0, months);
}

function sortTimeline(tl: RatingPoint[]): RatingPoint[] {
  return [...tl].sort((a, b) => a.from.localeCompare(b.from));
}

function getYearSlices(rates: VaRates): { year: string; eff: Date }[] {
  return Object.entries(rates)
    .filter(([k]) => /^(\d{4})$/.test(k))
    .map(([year, v]) => ({ year, eff: parseISO((v as any).effective) }))
    .sort((a, b) => a.eff.getTime() - b.eff.getTime());
}

function findApplicableYear(rates: VaRates, date: Date): string | null {
  const slices = getYearSlices(rates);
  let found: string | null = null;
  for (const s of slices) {
    if (s.eff <= date) found = s.year; else break;
  }
  return found;
}

function getMonthlyForRating(yearRates: any, rating: number, family: BackpayOptions): number {
  if (rating === 10 || rating === 20) {
    return yearRates.minor?.[String(rating)] ?? 0;
  }
  const group = rating <= 60 ? '30_60' : '70_100';
  const table = yearRates[group];
  if (!table) return 0;

  const base = table[family.baselineFamily]?.[family.baselineKey]?.[String(rating)] ?? 0;
  let add = 0;
  const added = table.added || {};
  if (family.extraUnder18 && family.extraUnder18 > 0) {
    add += (added.each_additional_child_under18?.[String(rating)] || 0) * family.extraUnder18;
  }
  if (family.extraOver18School && family.extraOver18School > 0) {
    add += (added.each_additional_child_over18_school?.[String(rating)] || 0) * family.extraOver18School;
  }
  if (family.spouseAidAndAttendance) {
    add += added.spouse_aid_and_attendance?.[String(rating)] || 0;
  }
  return base + add;
}

export function estimateBackPayUSD(
  effectiveISO: string,
  timeline: RatingPoint[],
  rates: VaRates,
  family: BackpayOptions,
  now: Date = new Date()
): number {
  if (!effectiveISO) return 0;
  const eff = parseISO(effectiveISO);
  const pts = sortTimeline(timeline).filter(p => parseISO(p.from) < now);
  if (pts.length === 0) return 0;

  let total = 0;
  for (let i = 0; i < pts.length; i++) {
    const segStart = new Date(Math.max(eff.getTime(), parseISO(pts[i].from).getTime()));
    const segEnd = i < pts.length - 1 ? parseISO(pts[i + 1].from) : now;
    if (segEnd <= segStart) continue;

    let cursor = segStart;
    while (cursor < segEnd) {
      const year = findApplicableYear(rates, cursor);
      if (!year) break;

      const slices = getYearSlices(rates);
      const idx = slices.findIndex(s => s.year === year);
      const nextBoundary = idx >= 0 && idx < slices.length - 1 ? slices[idx + 1].eff : segEnd;
      const chunkEnd = new Date(Math.min(segEnd.getTime(), nextBoundary.getTime()));
      const months = monthsBetween(cursor, chunkEnd);
      if (months > 0) {
        const monthly = getMonthlyForRating((rates as any)[year], pts[i].rating, family);
        total += monthly * months;
      }
      cursor = chunkEnd;
      if (cursor.getTime() === nextBoundary.getTime() && nextBoundary < segEnd) {
        cursor = new Date(Date.UTC(cursor.getUTCFullYear(), cursor.getUTCMonth(), 2));
      }
    }
  }
  return Math.round(total);
}

export { monthsBetween };
