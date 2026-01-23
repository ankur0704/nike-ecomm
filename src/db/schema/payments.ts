import { pgTable, text, uuid, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { orders } from "./orders";

export const paymentMethodEnum = pgEnum("payment_method", ["stripe", "paypal", "cod"]);
export const paymentStatusEnum = pgEnum("payment_status", ["initiated", "completed", "failed"]);

export const payments = pgTable("payments", {
    id: uuid("id").primaryKey().defaultRandom(),
    orderId: uuid("order_id").notNull().references(() => orders.id),
    method: paymentMethodEnum("method").notNull(),
    status: paymentStatusEnum("status").default("initiated").notNull(),
    paidAt: timestamp("paid_at"),
    transactionId: text("transaction_id"),
});

export const insertPaymentSchema = createInsertSchema(payments);
export const selectPaymentSchema = createSelectSchema(payments);
