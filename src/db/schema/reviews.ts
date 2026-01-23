import { pgTable, text, uuid, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { products } from "./products";
import { user } from "./user";

export const reviews = pgTable("reviews", {
    id: uuid("id").primaryKey().defaultRandom(),
    productId: uuid("product_id").notNull().references(() => products.id),
    userId: text("user_id").notNull().references(() => user.id),
    rating: integer("rating").notNull(),
    comment: text("comment"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertReviewSchema = createInsertSchema(reviews);
export const selectReviewSchema = createSelectSchema(reviews);
