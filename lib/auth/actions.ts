"use server";

import { auth } from "../../auth";
import { db } from "../../src/db";
import { guest } from "../../src/db/schema/guest";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().optional(),
});

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

// Server Actions
export async function signUp(prevState: any, formData: FormData) {
  try {
    const data = signUpSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
      name: formData.get("name") || undefined,
    });

    await auth.api.signUpEmail({
      body: {
        email: data.email,
        password: data.password,
        name: data.name || "",
      },
    });

    // Merge guest cart if exists
    await mergeGuestCartWithUserCart();

  } catch (error) {
    console.error('SignUp error:', error);
    if (error instanceof z.ZodError) {
      return { error: error.errors[0].message };
    }
    return { error: `Debug Error: ${error instanceof Error ? error.message : String(error)}` };
  }
  redirect("/");
}

export async function signIn(prevState: any, formData: FormData) {
  const data = signInSchema.parse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  try {
    await signInInternal(data.email, data.password);

    // Merge guest cart if exists
    await mergeGuestCartWithUserCart();

  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.errors[0].message };
    }
    return { error: "Invalid credentials" };
  }
  redirect("/");
}

async function signInInternal(email: string, password: string) {
  await auth.api.signInEmail({
    body: {
      email,
      password,
    },
  });
}

export async function signOut() {
  "use server";
  await auth.api.signOut();
  redirect("/");
}

export async function createGuestSession() {
  const sessionToken = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

  await db.insert(guest).values({
    id: crypto.randomUUID(),
    sessionToken,
    expiresAt,
  });

  const cookieStore = await cookies();
  cookieStore.set("guest_session", sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  });

  return sessionToken;
}

export async function guestSession() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("guest_session")?.value;

  if (!sessionToken) {
    return null;
  }

  const guestRecord = await db
    .select()
    .from(guest)
    .where(eq(guest.sessionToken, sessionToken))
    .limit(1);

  if (guestRecord.length === 0 || guestRecord[0].expiresAt < new Date()) {
    // Expired or invalid
    cookieStore.delete("guest_session");
    return null;
  }

  return guestRecord[0];
}

export async function mergeGuestCartWithUserCart() {
  // Placeholder for cart merging logic
  // Since cart is not implemented, just remove guest session
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("guest_session")?.value;

  if (sessionToken) {
    await db.delete(guest).where(eq(guest.sessionToken, sessionToken));
    cookieStore.delete("guest_session");
  }
}