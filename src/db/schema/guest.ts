import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';

export const guest = pgTable("guest", {
  id: text("id").primaryKey(),
  sessionToken: text("session_token").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  expiresAt: timestamp("expires_at").notNull(),
});