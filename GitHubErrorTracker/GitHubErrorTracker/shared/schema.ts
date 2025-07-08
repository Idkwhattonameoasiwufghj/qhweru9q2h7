import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  discordId: text("discord_id").notNull().unique(),
  username: text("username").notNull(),
  displayName: text("display_name").notNull(),
  location: text("location"),
  bio: text("bio"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const trades = pgTable("trades", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  offering: text("offering").notNull(),
  seeking: text("seeking").notNull(),
  category: text("category").notNull(), // Plants, Seeds, Tools, Soil, Containers
  status: text("status").notNull().default("open"), // open, pending, completed, cancelled
  location: text("location").notNull(),
  images: text("images").array().default([]),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertTradeSchema = createInsertSchema(trades).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateTradeSchema = insertTradeSchema.partial().extend({
  id: z.number(),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertTrade = z.infer<typeof insertTradeSchema>;
export type Trade = typeof trades.$inferSelect;
export type UpdateTrade = z.infer<typeof updateTradeSchema>;

// Extended types for frontend
export type TradeWithUser = Trade & {
  user: Pick<User, 'username' | 'displayName' | 'location'>;
};

export const TRADE_CATEGORIES = [
  "Plants & Seedlings",
  "Seeds",
  "Tools & Equipment", 
  "Soil & Fertilizer",
  "Pots & Containers",
  "Other"
] as const;

export const TRADE_STATUSES = [
  "open",
  "pending", 
  "completed",
  "cancelled"
] as const;
