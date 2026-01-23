import { pgTable, text, uuid, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { user } from "./user";
import { products } from "./products";

export const wishlists = pgTable("wishlists", {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: text("user_id").notNull().references(() => user.id),
    productId: uuid("product_id").notNull().references(() => products.id),
    addedAt: timestamp("added_at").defaultNow().notNull(),
});

export const insertWishlistSchema = createInsertSchema(wishlists);
export const selectWishlistSchema = createSelectSchema(wishlists);
