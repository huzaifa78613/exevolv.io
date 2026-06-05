import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const SITE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://exevolv.io' 
  : 'http://localhost:3000';
