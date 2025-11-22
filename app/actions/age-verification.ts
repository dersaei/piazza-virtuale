// app/actions/age-verification.ts
"use server";

import "server-only";
import { cookies } from "next/headers";

const AGE_VERIFIED_COOKIE = "age_verified";
const COOKIE_EXPIRY_DAYS = 30;

/**
 * Server Action to set age verification cookie
 * Called when user confirms they are 18+
 */
export async function setAgeVerified(): Promise<{ success: boolean }> {
  try {
    const cookieStore = await cookies();

    cookieStore.set(AGE_VERIFIED_COOKIE, "true", {
      maxAge: COOKIE_EXPIRY_DAYS * 24 * 60 * 60, // 30 days in seconds
      path: "/",
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production", // HTTPS only in production
      httpOnly: false, // Client needs to read this cookie
    });

    return { success: true };
  } catch (error) {
    console.error("Error setting age verification cookie:", error);
    return { success: false };
  }
}

/**
 * Server-side check if user has verified age
 * Can be used in Server Components or API routes
 */
export async function isAgeVerified(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const ageVerified = cookieStore.get(AGE_VERIFIED_COOKIE);
    return ageVerified?.value === "true";
  } catch (error) {
    console.error("Error checking age verification:", error);
    return false;
  }
}

/**
 * Server Action to clear age verification (useful for testing)
 */
export async function clearAgeVerification(): Promise<{ success: boolean }> {
  try {
    const cookieStore = await cookies();
    cookieStore.delete(AGE_VERIFIED_COOKIE);
    return { success: true };
  } catch (error) {
    console.error("Error clearing age verification cookie:", error);
    return { success: false };
  }
}
