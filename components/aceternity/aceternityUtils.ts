import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function aceternityUicn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
