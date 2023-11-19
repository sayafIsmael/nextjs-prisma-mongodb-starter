import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatShortUsername = (input?: string | null) => {
  if (input)
    return input.replace(
      /(\b\w)\w* (\w)\w*\b|\b\w{1,2}\b/g,
      (match, first, last) => {
        if (first && last) {
          return `${first.toUpperCase()}${last.toUpperCase()}`;
        } else {
          return match.toUpperCase();
        }
      }
    );
};
