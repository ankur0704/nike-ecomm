import { pgTable, text, uuid, numeric, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { user } from "./user";
import { addresses } from "./addresses";

export const orderStatusEnum = pgEnum("order_status", ["pending", "paid", "shipped", "delivered", "cancelled"]);

export const orders = pgTable("orders", {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: text("user_id").notNull().references(() => user.id),
    status: orderStatusEnum("status").default("pending").notNull(),
    totalAmount: numeric("total_amount", { precision: 10, scale: 2 }).notNull(),
    shippingAddressId: uuid("shipping_address_id").references(() => addresses.id),
    billingAddressId: uuid("billing_address_id").references(() => addresses.id),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertOrderSchema = createInsertSchema(orders);
export const selectOrderSchema = createSelectSchema(orders);
