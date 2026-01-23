import { pgTable, text, uuid, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { categories } from "./categories";
import { brands } from "./brands";
import { genders } from "./filters/genders";
import { variants } from "./variants";

export const products = pgTable("products", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    description: text("description"),
    categoryId: uuid("category_id").references(() => categories.id),
    genderId: uuid("gender_id").references(() => genders.id),
    brandId: uuid("brand_id").references(() => brands.id),
    isPublished: boolean("is_published").default(false).notNull(),
    // defaultVariantId is a circular dependency, handled at app level or careful seeding, referencing variants.id
    // We cannot easily reference variants.id here due to circular import if variants imports products
    // So we define the column but adding the reference might require deferral or separate relation file
    defaultVariantId: uuid("default_variant_id"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertProductSchema = createInsertSchema(products);
export const selectProductSchema = createSelectSchema(products);
