import { pgTable, text, uuid, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { user } from "./user";
import { guest } from "./guest";

export const carts = pgTable("carts", {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: text("user_id").references(() => user.id),
    guestId: text("guest_id").references(() => guest.id),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertCartSchema = createInsertSchema(carts);
export const selectCartSchema = createSelectSchema(carts);
