import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Utility functions for handling API URLs
 */
export const buildApiUrl = (path: string): string => {
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000/api';
  
  // Remove any leading slash from the path
  const cleanPath = path.startsWith('/') ? path.substring(1) : path;
  
  // Combine and ensure no double slashes
  let url = `${baseUrl}/${cleanPath}`;
  
  // Replace any double slashes with single slashes, but preserve http:// or https://
  url = url.replace(/(https?:\/\/)|(\/\/)/g, (match) => {
    return match === '//' ? '/' : match;
  });
  
  return url;
};