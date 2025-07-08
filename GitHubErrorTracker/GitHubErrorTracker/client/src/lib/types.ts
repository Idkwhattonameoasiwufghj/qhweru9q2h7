export type { 
  Trade, 
  TradeWithUser, 
  User, 
  InsertTrade, 
  UpdateTrade,
  InsertUser 
} from "@shared/schema";

export interface TradeFilters {
  category?: string;
  status?: string;
  searchTerm?: string;
  userId?: number;
}

export interface AppStats {
  totalTrades: number;
  activeTrades: number;
  completedTrades: number;
  totalUsers: number;
}

export interface MetaData {
  categories: readonly string[];
  statuses: readonly string[];
}
