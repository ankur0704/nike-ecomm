import { pgTable, text, uuid, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { products } from "./products";
import { variants } from "./variants";

export const productImages = pgTable("product_images", {
    id: uuid("id").primaryKey().defaultRandom(),
    productId: uuid("product_id").notNull().references(() => products.id),
    variantId: uuid("variant_id").references(() => variants.id),
    url: text("url").notNull(),
    sortOrder: integer("sort_order").notNull().default(0),
    isPrimary: boolean("is_primary").default(false).notNull(),
});

export const insertProductImageSchema = createInsertSchema(productImages);
export const selectProductImageSchema = createSelectSchema(productImages);
