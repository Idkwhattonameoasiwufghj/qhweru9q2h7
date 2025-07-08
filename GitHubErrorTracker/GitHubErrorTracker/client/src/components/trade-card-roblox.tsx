import { Badge, Button, Card, CardContent } from "@/components/ui-consolidated";
import { Heart, MapPin, Clock, CheckCircle, Sparkles } from "lucide-react";
import { Link } from "wouter";
import { formatDistanceToNow } from "date-fns";
import type { TradeWithUser } from "@/lib/types";

interface TradeCardProps {
  trade: TradeWithUser;
}

const statusConfig = {
  open: {
    label: "🌱 Growing",
    className: "bg-green-200 text-green-900 border-green-400 font-bold",
    button: "🔍 View Plant",
    buttonClass: "roblox-button bg-gradient-to-r from-green-500 to-emerald-500"
  },
  pending: {
    label: "⏳ Trading", 
    className: "bg-yellow-200 text-yellow-900 border-yellow-400 font-bold",
    button: "🤝 Negotiating",
    buttonClass: "roblox-button bg-gradient-to-r from-yellow-500 to-orange-500"
  },
  completed: {
    label: "🏆 Harvested",
    className: "bg-blue-200 text-blue-900 border-blue-400 font-bold", 
    button: "✅ Complete!",
    buttonClass: "roblox-button bg-gradient-to-r from-green-500 to-blue-500"
  },
  cancelled: {
    label: "❌ Wilted",
    className: "bg-red-200 text-red-900 border-red-400 font-bold",
    button: "💔 Cancelled",
    buttonClass: "roblox-button bg-gradient-to-r from-gray-500 to-red-500"
  }
};

const categoryEmojis = {
  "Plants & Seedlings": "🌱",
  "Seeds": "🌰",
  "Tools & Equipment": "🛠️",
  "Soil & Fertilizer": "🌍",
  "Pots & Containers": "🪴",
  "Other": "✨"
};

const categoryColors = {
  "Plants & Seedlings": "bg-green-200 text-green-900 border-green-400",
  "Seeds": "bg-amber-200 text-amber-900 border-amber-400",
  "Tools & Equipment": "bg-purple-200 text-purple-900 border-purple-400",
  "Soil & Fertilizer": "bg-orange-200 text-orange-900 border-orange-400",
  "Pots & Containers": "bg-blue-200 text-blue-900 border-blue-400",
  "Other": "bg-pink-200 text-pink-900 border-pink-400"
};

// Colorful game-style background gradients
const cardGradients = [
  "bg-gradient-to-br from-green-100 to-emerald-200",
  "bg-gradient-to-br from-blue-100 to-cyan-200", 
  "bg-gradient-to-br from-purple-100 to-pink-200",
  "bg-gradient-to-br from-yellow-100 to-orange-200",
  "bg-gradient-to-br from-red-100 to-rose-200"
];

export function TradeCard({ trade }: TradeCardProps) {
  const status = statusConfig[trade.status as keyof typeof statusConfig];
  const categoryColor = categoryColors[trade.category as keyof typeof categoryColors] || categoryColors.Other;
  const categoryEmoji = categoryEmojis[trade.category as keyof typeof categoryEmojis] || categoryEmojis.Other;
  const gradient = cardGradients[trade.id % cardGradients.length];
  
  const timeAgo = formatDistanceToNow(new Date(trade.createdAt), { addSuffix: true });
  const userInitials = trade.user.displayName.split(' ').map(n => n[0]).join('').toUpperCase();

  return (
    <Card className={`roblox-card hover:scale-105 transition-all duration-300 ${gradient} bounce-in`}>
      <div className="relative p-4">
        <div className="flex justify-between items-start mb-4">
          <Badge className={`${status.className} text-lg px-4 py-2 border-2`}>
            {status.label}
          </Badge>
          <Badge className={`${categoryColor} text-lg px-3 py-2 border-2 font-bold`}>
            {categoryEmoji} {trade.category.split(' & ')[0]}
          </Badge>
        </div>
        
        <div className="text-center mb-6">
          <div className="text-6xl mb-2 floating-icon">{categoryEmoji}</div>
          <h3 className="text-2xl font-bold text-primary mb-2">{trade.user.displayName}</h3>
          <p className="text-lg text-secondary font-semibold">@{trade.user.username}</p>
          {trade.user.location && (
            <p className="text-sm text-muted-foreground mt-2">📍 {trade.user.location}</p>
          )}
        </div>
        
        <div className="space-y-4 mb-6">
          <div className="roblox-card bg-gradient-to-r from-green-200 to-emerald-200 p-4">
            <p className="text-lg font-bold text-green-900 mb-2">🌿 Growing:</p>
            <p className="text-lg text-green-900 font-semibold">{trade.offering}</p>
          </div>
          
          <div className="roblox-card bg-gradient-to-r from-blue-200 to-cyan-200 p-4">
            <p className="text-lg font-bold text-blue-900 mb-2">🌱 Wants:</p>
            <p className="text-lg text-blue-900 font-semibold">{trade.seeking}</p>
          </div>
          
          {trade.description && (
            <div className="roblox-card bg-gradient-to-r from-purple-200 to-pink-200 p-4">
              <p className="text-lg font-bold text-purple-900 mb-2">📝 Notes:</p>
              <p className="text-sm text-purple-900">{trade.description}</p>
            </div>
          )}
        </div>
        
        <div className="flex items-center justify-center mb-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-accent">
            <Clock className="w-4 h-4" />
            <span>{timeAgo}</span>
          </div>
        </div>
        
        <Link href={`/trades/${trade.id}`}>
          <Button 
            className={`w-full text-xl py-4 ${status.buttonClass}`}
            disabled={trade.status === 'completed' || trade.status === 'cancelled'}
          >
            {trade.status === 'completed' && (
              <CheckCircle className="w-6 h-6 mr-3" />
            )}
            {status.button}
          </Button>
        </Link>
      </div>
    </Card>
  );
}