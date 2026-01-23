import { pgTable, text, uuid, AnyPgColumn } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const categories = pgTable("categories", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    slug: text("slug").notNull().unique(),
    parentId: uuid("parent_id").references((): AnyPgColumn => categories.id),
});

export const insertCategorySchema = createInsertSchema(categories);
export const selectCategorySchema = createSelectSchema(categories);
