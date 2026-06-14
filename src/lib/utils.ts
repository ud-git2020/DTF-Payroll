import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format } from 'date-fns';

/** Merge Tailwind classes safely (shadcn-style helper). */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const lkr = new Intl.NumberFormat('en-LK', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/** Format a number as a payroll figure, e.g. 35000 -> "35,000.00". */
export function money(value: number | null | undefined): string {
  if (value === null || value === undefined || Number.isNaN(value)) return '—';
  return lkr.format(value);
}

/** Format a date the way the legacy system did: 30-Apr-26. */
export function shortDate(d: Date | string): string {
  return format(new Date(d), 'dd-MMM-yy');
}

export function isoDate(d: Date | string): string {
  return format(new Date(d), 'yyyy-MM-dd');
}
