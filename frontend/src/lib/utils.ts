import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const delayFetch = async <T>(fetchFunction: () => Promise<T>, minimumDelay = 2000): Promise<T> => {
  const startTime = performance.now();

  const result = await fetchFunction();

  const endTime = performance.now();
  const fetchDuration = endTime - startTime;

  const delay = minimumDelay - fetchDuration;
  if (delay > 0) {
    await new Promise((resolve) => setTimeout(resolve, delay));
  }

  return result;
};
