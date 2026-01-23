import { pgTable, text, uuid, integer, numeric, jsonb, timestamp, real } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { products } from "./products";
import { colors } from "./filters/colors";
import { sizes } from "./filters/sizes";

export const variants = pgTable("variants", {
    id: uuid("id").primaryKey().defaultRandom(),
    productId: uuid("product_id").notNull().references(() => products.id),
    sku: text("sku").notNull().unique(),
    price: numeric("price", { precision: 10, scale: 2 }).notNull(),
    salePrice: numeric("sale_price", { precision: 10, scale: 2 }),
    colorId: uuid("color_id").notNull().references(() => colors.id),
    sizeId: uuid("size_id").notNull().references(() => sizes.id),
    inStock: integer("in_stock").notNull().default(0),
    weight: real("weight"),
    dimensions: jsonb("dimensions"), // { length, width, height }
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertVariantSchema = createInsertSchema(variants);
export const selectVariantSchema = createSelectSchema(variants);
