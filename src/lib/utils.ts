import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

interface Character {
  value: number,
  label: string,
  enabled: boolean,
  limit: number
}

export const characterList: Character[] = [
  {
      value: 2,
      label: "2 Characters (up to 24 hours)",
      enabled: true,
      limit: 500 // 676
  },
  {
      value: 3,
      label: "3 Characters (up to 48 hours)",
      enabled: true,
      limit: 10000 // 17576
  },
  {
      value: 4,
      label: "4 Characters (up to 7 days)",
      enabled: true,
      limit: 300000 // 456976
  },
  {
      value: 5,
      label: "5 Characters (up to 12 days)",
      enabled: true,
      limit: 8000000 // 11881376
  },
  {
      value: 6,
      label: "6 Characters (up to 30 days)",
      enabled: true,
      limit: 308915776
  },
  {
      value: 7,
      label: "7 Characters (up to 60 days)",
      enabled: true,
      limit: 8031810176
  }
]

// Expire List
// 0 means that the expire is available for the custom URL.
export const expireList = [
  { 
    value: '1m', 
    label: '1 Minute', 
    characterCount: [0, 2, 3, 4, 5, 6, 7] 
  },
  { 
    value: '10m', 
    label: '10 Minutes', 
    characterCount: [0, 2, 3, 4, 5, 6, 7] 
  },
  { 
    value: '1h', 
    label: '1 Hour', 
    characterCount: [0, 2, 3, 4, 5, 6, 7] 
  },
  { 
    value: '12h', 
    label: '12 Hours', 
    characterCount: [0, 2, 3, 4, 5, 6, 7] 
  },
  { 
    value: '24h', 
    label: '24 Hours', 
    characterCount: [0, 2, 3, 4, 5, 6, 7] 
  },
  { 
    value: '48h', 
    label: '48 Hours', 
    characterCount: [0, 3, 4, 5, 6, 7]
  },
  { 
    value: '7d', 
    label: '7 Days', 
    characterCount: [0, 4, 5, 6, 7] 
  },
  { 
    value: '12d', 
    label: '12 Days', 
    characterCount: [0, 5, 6, 7] 
  },
  { 
    value: '30d', 
    label: '30 Days', 
    characterCount: [5, 6, 7] 
  },
  { 
    value: '60d', 
    label: '60 Days', 
    characterCount: [7] 
  }
]