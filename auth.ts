import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./src/db";
import * as schema from "./src/db/schema";

export const auth = betterAuth({
  baseURL: process.env.NEXTAUTH_URL || "http://localhost:3000",
  secret: process.env.NEXTAUTH_SECRET || "your-secret-key",
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: schema,
  }),
  emailAndPassword: {
    enabled: true,
  },
});