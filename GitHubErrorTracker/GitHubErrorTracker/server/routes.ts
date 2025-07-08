import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertTradeSchema, updateTradeSchema, insertUserSchema, TRADE_CATEGORIES, TRADE_STATUSES } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all trades with optional filters
  app.get("/api/trades", async (req, res) => {
    try {
      const { category, status, search, userId } = req.query;
      
      const filters = {
        category: category as string,
        status: status as string,
        searchTerm: search as string,
        userId: userId ? parseInt(userId as string) : undefined
      };

      const trades = await storage.getAllTrades(filters);
      res.json(trades);
    } catch (error) {
      console.error("Error fetching trades:", error);
      res.status(500).json({ message: "Failed to fetch trades" });
    }
  });

  // Get single trade by ID
  app.get("/api/trades/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid trade ID" });
      }

      const trade = await storage.getTradeWithUser(id);
      if (!trade) {
        return res.status(404).json({ message: "Trade not found" });
      }

      res.json(trade);
    } catch (error) {
      console.error("Error fetching trade:", error);
      res.status(500).json({ message: "Failed to fetch trade" });
    }
  });

  // Create new trade
  app.post("/api/trades", async (req, res) => {
    try {
      const validatedData = insertTradeSchema.parse(req.body);
      
      // For demo purposes, use a default user if none provided
      if (!validatedData.userId) {
        validatedData.userId = 1; // Default to first demo user
      }

      const trade = await storage.createTrade(validatedData);
      const tradeWithUser = await storage.getTradeWithUser(trade.id);
      
      res.status(201).json(tradeWithUser);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Validation error",
          errors: error.errors 
        });
      }
      console.error("Error creating trade:", error);
      res.status(500).json({ message: "Failed to create trade" });
    }
  });

  // Update trade
  app.patch("/api/trades/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid trade ID" });
      }

      const validatedData = updateTradeSchema.parse({ ...req.body, id });
      const trade = await storage.updateTrade(validatedData);
      const tradeWithUser = await storage.getTradeWithUser(trade.id);
      
      res.json(tradeWithUser);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Validation error",
          errors: error.errors 
        });
      }
      console.error("Error updating trade:", error);
      res.status(500).json({ message: "Failed to update trade" });
    }
  });

  // Delete trade
  app.delete("/api/trades/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid trade ID" });
      }

      const success = await storage.deleteTrade(id);
      if (!success) {
        return res.status(404).json({ message: "Trade not found" });
      }

      res.json({ message: "Trade deleted successfully" });
    } catch (error) {
      console.error("Error deleting trade:", error);
      res.status(500).json({ message: "Failed to delete trade" });
    }
  });

  // Get user trades
  app.get("/api/users/:userId/trades", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      if (isNaN(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }

      const trades = await storage.getUserTrades(userId);
      res.json(trades);
    } catch (error) {
      console.error("Error fetching user trades:", error);
      res.status(500).json({ message: "Failed to fetch user trades" });
    }
  });

  // Get current user (demo endpoint)
  app.get("/api/auth/me", async (req, res) => {
    try {
      // For demo purposes, return the first user
      const user = await storage.getUser(1);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      console.error("Error fetching current user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Get trade categories and statuses
  app.get("/api/meta", async (req, res) => {
    try {
      res.json({
        categories: TRADE_CATEGORIES,
        statuses: TRADE_STATUSES
      });
    } catch (error) {
      console.error("Error fetching metadata:", error);
      res.status(500).json({ message: "Failed to fetch metadata" });
    }
  });

  // Stats endpoint
  app.get("/api/stats", async (req, res) => {
    try {
      const allTrades = await storage.getAllTrades();
      const stats = {
        totalTrades: allTrades.length,
        activeTrades: allTrades.filter(t => t.status === "open").length,
        completedTrades: allTrades.filter(t => t.status === "completed").length,
        totalUsers: 89 // Demo value
      };
      res.json(stats);
    } catch (error) {
      console.error("Error fetching stats:", error);
      res.status(500).json({ message: "Failed to fetch stats" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
