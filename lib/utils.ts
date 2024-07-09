import { PinCodeResponseSchema } from "@/hooks/pincode/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getBadgeDetails(data: PinCodeResponseSchema | undefined) {
  if (!data) {
    return {
      text: "Check",
      classes:
        "bg-primary/20 text-primary cursor-pointer hover:text-primary-foreground hover:bg-primary",
    };
  }
  if (data === undefined || data.code === 404 || data.status === "error")
    return {
      text: "Pincode Not Found",
      classes:
        "bg-red-100 text-red-600 cursor-pointer hover:text-primary-foreground hover:bg-red-500",
    };

  const { isCODServiceable, isPrepaidServiceable } = data.data;

  if (isCODServiceable && isPrepaidServiceable) {
    return {
      text: "Delivery available for this pincode. Please proceed.",
      classes:
        "bg-primary/20 text-primary cursor-pointer hover:text-primary-foreground hover:bg-primary",
    };
  }

  if (!isCODServiceable && isPrepaidServiceable) {
    return {
      text: "Delivery is only available on prepaid orders for this pincode.",
      classes:
        "bg-orange-100 text-orange-600 cursor-pointer hover:text-primary-foreground hover:bg-orange-500",
    };
  }

  return {
    text: "Delivery is not available to this pincode number",
    classes:
      "bg-red-100 text-red-600 cursor-pointer hover:text-primary-foreground hover:bg-red-500",
  };
}



export const constructParams = (params: Record<string, string | string[]>): URLSearchParams => {
  const searchParams = new URLSearchParams();
  Object.keys(params).forEach((key) => {
    const value = params[key];
    if (Array.isArray(value)) {
      value.forEach((val) => searchParams.append(key, val));
    } else {
      searchParams.append(key, value);
    }
  });
  return searchParams;
};
