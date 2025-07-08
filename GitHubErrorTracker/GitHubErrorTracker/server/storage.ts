import { users, trades, type User, type InsertUser, type Trade, type InsertTrade, type TradeWithUser, type UpdateTrade } from "@shared/schema";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByDiscordId(discordId: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Trades
  getTrade(id: number): Promise<Trade | undefined>;
  getTradeWithUser(id: number): Promise<TradeWithUser | undefined>;
  getAllTrades(filters?: TradeFilters): Promise<TradeWithUser[]>;
  getUserTrades(userId: number): Promise<TradeWithUser[]>;
  createTrade(trade: InsertTrade): Promise<Trade>;
  updateTrade(trade: UpdateTrade): Promise<Trade>;
  deleteTrade(id: number): Promise<boolean>;
}

export interface TradeFilters {
  category?: string;
  status?: string;
  location?: string;
  searchTerm?: string;
  userId?: number;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private trades: Map<number, Trade>;
  private currentUserId: number;
  private currentTradeId: number;

  constructor() {
    this.users = new Map();
    this.trades = new Map();
    this.currentUserId = 1;
    this.currentTradeId = 1;
    
    // Add demo users
    this.seedDemoData();
  }

  private seedDemoData() {
    // Demo users
    const demoUsers: User[] = [
      {
        id: 1,
        discordId: "sarah_gardens_123",
        username: "Sarah_Gardens",
        displayName: "Sarah Gardens",
        location: "Brooklyn, NY",
        bio: "Urban gardener passionate about heirloom tomatoes",
        createdAt: new Date()
      },
      {
        id: 2,
        discordId: "mike_grows_456",
        username: "Mike_Grows", 
        displayName: "Mike Thompson",
        location: "Queens, NY",
        bio: "Tool collector and composting enthusiast",
        createdAt: new Date()
      },
      {
        id: 3,
        discordId: "lisa_herbs_789",
        username: "Lisa_Herbs",
        displayName: "Lisa Chen",
        location: "Manhattan, NY", 
        bio: "Herb specialist and seed saver",
        createdAt: new Date()
      }
    ];

    demoUsers.forEach(user => {
      this.users.set(user.id, user);
      this.currentUserId = Math.max(this.currentUserId, user.id + 1);
    });

    // Demo trades
    const demoTrades: Trade[] = [
      {
        id: 1,
        userId: 1,
        title: "Organic Tomato Seedlings",
        description: "Healthy Cherokee Purple tomato seedlings, 3 weeks old, hardened off and ready to transplant.",
        offering: "6 healthy Cherokee Purple tomato seedlings, 3 weeks old",
        seeking: "Herb seedlings (basil, oregano) or flower seeds",
        category: "Plants & Seedlings",
        status: "open",
        location: "Brooklyn, NY",
        images: [],
        isActive: true,
        createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
        updatedAt: new Date(Date.now() - 3 * 60 * 60 * 1000)
      },
      {
        id: 2,
        userId: 2,
        title: "Garden Tool Set",
        description: "Lightly used garden tools in great condition. Perfect for someone starting their garden.",
        offering: "Hand trowel, pruning shears, weeder - lightly used",
        seeking: "Large terracotta pots or garden soil",
        category: "Tools & Equipment",
        status: "pending",
        location: "Queens, NY",
        images: [],
        isActive: true,
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
        updatedAt: new Date(Date.now() - 12 * 60 * 60 * 1000)
      },
      {
        id: 3,
        userId: 3,
        title: "Heirloom Seed Collection",
        description: "Collection of rare heirloom vegetable seeds, all from last season's harvest.",
        offering: "Rainbow chard, black kale, purple carrot seeds",
        seeking: "Sunflower or marigold seeds for companion planting",
        category: "Seeds",
        status: "open",
        location: "Manhattan, NY",
        images: [],
        isActive: true,
        createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
        updatedAt: new Date(Date.now() - 5 * 60 * 60 * 1000)
      }
    ];

    demoTrades.forEach(trade => {
      this.trades.set(trade.id, trade);
      this.currentTradeId = Math.max(this.currentTradeId, trade.id + 1);
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByDiscordId(discordId: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.discordId === discordId);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { 
      ...insertUser,
      location: insertUser.location || null,
      bio: insertUser.bio || null,
      id,
      createdAt: new Date()
    };
    this.users.set(id, user);
    return user;
  }

  async getTrade(id: number): Promise<Trade | undefined> {
    return this.trades.get(id);
  }

  async getTradeWithUser(id: number): Promise<TradeWithUser | undefined> {
    const trade = this.trades.get(id);
    if (!trade) return undefined;
    
    const user = this.users.get(trade.userId);
    if (!user) return undefined;

    return {
      ...trade,
      user: {
        username: user.username,
        displayName: user.displayName,
        location: user.location
      }
    };
  }

  async getAllTrades(filters?: TradeFilters): Promise<TradeWithUser[]> {
    let tradesArray = Array.from(this.trades.values())
      .filter(trade => trade.isActive)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    if (filters) {
      if (filters.category && filters.category !== "All Categories") {
        tradesArray = tradesArray.filter(trade => trade.category === filters.category);
      }
      if (filters.status && filters.status !== "All Status") {
        tradesArray = tradesArray.filter(trade => trade.status === filters.status);
      }
      if (filters.searchTerm) {
        const term = filters.searchTerm.toLowerCase();
        tradesArray = tradesArray.filter(trade => 
          trade.title.toLowerCase().includes(term) ||
          trade.description.toLowerCase().includes(term) ||
          trade.offering.toLowerCase().includes(term) ||
          trade.seeking.toLowerCase().includes(term)
        );
      }
      if (filters.userId) {
        tradesArray = tradesArray.filter(trade => trade.userId === filters.userId);
      }
    }

    return tradesArray.map(trade => {
      const user = this.users.get(trade.userId)!;
      return {
        ...trade,
        user: {
          username: user.username,
          displayName: user.displayName,
          location: user.location
        }
      };
    });
  }

  async getUserTrades(userId: number): Promise<TradeWithUser[]> {
    return this.getAllTrades({ userId });
  }

  async createTrade(insertTrade: InsertTrade): Promise<Trade> {
    const id = this.currentTradeId++;
    const now = new Date();
    const trade: Trade = { 
      ...insertTrade,
      status: insertTrade.status || "open",
      images: insertTrade.images || [],
      isActive: insertTrade.isActive ?? true,
      id,
      createdAt: now,
      updatedAt: now
    };
    this.trades.set(id, trade);
    return trade;
  }

  async updateTrade(updateTrade: UpdateTrade): Promise<Trade> {
    const existingTrade = this.trades.get(updateTrade.id);
    if (!existingTrade) {
      throw new Error("Trade not found");
    }

    const updatedTrade: Trade = {
      ...existingTrade,
      ...updateTrade,
      updatedAt: new Date()
    };
    
    this.trades.set(updateTrade.id, updatedTrade);
    return updatedTrade;
  }

  async deleteTrade(id: number): Promise<boolean> {
    const trade = this.trades.get(id);
    if (!trade) return false;
    
    // Soft delete by marking as inactive
    const updatedTrade: Trade = {
      ...trade,
      isActive: false,
      updatedAt: new Date()
    };
    
    this.trades.set(id, updatedTrade);
    return true;
  }
}

export const storage = new MemStorage();
