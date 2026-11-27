export function toIsoDate(year: number, monthIndex: number, day: number): string {
  const month = String(monthIndex + 1).padStart(2, "0");
  const dayPart = String(day).padStart(2, "0");
  return `${year}-${month}-${dayPart}`;
}

export function parseIsoDate(
  isoDate: string,
): { year: number; monthIndex: number; day: number } | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(isoDate);
  if (!match) {
    return null;
  }
  const year = Number(match[1]);
  const monthIndex = Number(match[2]) - 1;
  const day = Number(match[3]);
  if (!Number.isFinite(year) || monthIndex < 0 || monthIndex > 11 || day < 1 || day > 31) {
    return null;
  }
  return { year, monthIndex, day };
}

export function todayIsoDate(now = new Date()): string {
  return toIsoDate(now.getFullYear(), now.getMonth(), now.getDate());
}

export function isoToLocalDate(isoDate: string): Date | undefined {
  const parsed = parseIsoDate(isoDate);
  if (!parsed) {
    return undefined;
  }
  return new Date(parsed.year, parsed.monthIndex, parsed.day);
}

export function localDateToIso(date: Date): string {
  return toIsoDate(date.getFullYear(), date.getMonth(), date.getDate());
}

export function startOfToday(now = new Date()): Date {
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

export function formatIsoDateDisplay(isoDate: string, emptyLabel = "--/--/----"): string {
  const parsed = parseIsoDate(isoDate);
  if (!parsed) {
    return emptyLabel;
  }
  const day = String(parsed.day).padStart(2, "0");
  const month = String(parsed.monthIndex + 1).padStart(2, "0");
  return `${day}/${month}/${parsed.year}`;
}
