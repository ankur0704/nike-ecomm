import { pgTable, text, uuid, numeric, timestamp, integer, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const discountTypeEnum = pgEnum("discount_type", ["percentage", "fixed"]);

export const coupons = pgTable("coupons", {
    id: uuid("id").primaryKey().defaultRandom(),
    code: text("code").notNull().unique(),
    discountType: discountTypeEnum("discount_type").notNull(),
    discountValue: numeric("discount_value").notNull(),
    expiresAt: timestamp("expires_at"),
    maxUsage: integer("max_usage"),
    usedCount: integer("used_count").default(0),
});

export const insertCouponSchema = createInsertSchema(coupons);
export const selectCouponSchema = createSelectSchema(coupons);
