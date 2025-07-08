import { queryClient } from "./queryClient";
import type { TradeWithUser, InsertTrade, UpdateTrade, TradeFilters, AppStats, MetaData, User } from "./types";

export const api = {
  // Trades
  getTrades: (filters?: TradeFilters): Promise<TradeWithUser[]> => {
    const params = new URLSearchParams();
    if (filters?.category) params.append('category', filters.category);
    if (filters?.status) params.append('status', filters.status);
    if (filters?.searchTerm) params.append('search', filters.searchTerm);
    if (filters?.userId) params.append('userId', filters.userId.toString());
    
    const queryString = params.toString();
    return fetch(`/api/trades${queryString ? `?${queryString}` : ''}`).then(res => res.json());
  },

  getTrade: (id: number): Promise<TradeWithUser> => 
    fetch(`/api/trades/${id}`).then(res => res.json()),

  createTrade: async (trade: InsertTrade): Promise<TradeWithUser> => {
    const res = await fetch('/api/trades', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(trade)
    });
    if (!res.ok) throw new Error('Failed to create trade');
    return res.json();
  },

  updateTrade: async (trade: UpdateTrade): Promise<TradeWithUser> => {
    const res = await fetch(`/api/trades/${trade.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(trade)
    });
    if (!res.ok) throw new Error('Failed to update trade');
    return res.json();
  },

  deleteTrade: async (id: number): Promise<void> => {
    const res = await fetch(`/api/trades/${id}`, {
      method: 'DELETE'
    });
    if (!res.ok) throw new Error('Failed to delete trade');
  },

  getUserTrades: (userId: number): Promise<TradeWithUser[]> =>
    fetch(`/api/users/${userId}/trades`).then(res => res.json()),

  // Auth
  getCurrentUser: (): Promise<User> =>
    fetch('/api/auth/me').then(res => res.json()),

  // Meta
  getMeta: (): Promise<MetaData> =>
    fetch('/api/meta').then(res => res.json()),

  getStats: (): Promise<AppStats> =>
    fetch('/api/stats').then(res => res.json()),
};

// Mutation helpers
export const useMutations = {
  createTrade: () => ({
    mutationFn: api.createTrade,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/trades'] });
      queryClient.invalidateQueries({ queryKey: ['/api/stats'] });
    }
  }),

  updateTrade: () => ({
    mutationFn: api.updateTrade,
    onSuccess: (data: TradeWithUser) => {
      queryClient.invalidateQueries({ queryKey: ['/api/trades'] });
      queryClient.invalidateQueries({ queryKey: ['/api/trades', data.id] });
      queryClient.invalidateQueries({ queryKey: ['/api/stats'] });
    }
  }),

  deleteTrade: () => ({
    mutationFn: api.deleteTrade,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/trades'] });
      queryClient.invalidateQueries({ queryKey: ['/api/stats'] });
    }
  })
};
