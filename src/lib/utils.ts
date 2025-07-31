import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function parsePrice(price: string): number {
  if (!price) return 0;
  return parseFloat(price.replace('₹', '').replace(',', ''));
}
