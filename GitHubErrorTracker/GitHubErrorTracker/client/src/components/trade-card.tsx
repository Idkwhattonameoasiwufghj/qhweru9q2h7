import { Badge, Button, Card, CardContent } from "@/components/ui-consolidated";
import { Heart, MapPin, Clock, CheckCircle } from "lucide-react";
import { Link } from "wouter";
import { formatDistanceToNow } from "date-fns";
import type { TradeWithUser } from "@/lib/types";

interface TradeCardProps {
  trade: TradeWithUser;
}

const statusConfig = {
  open: {
    label: "Open",
    className: "bg-green-100 text-green-700",
    button: "View Details",
    buttonClass: "bg-primary text-primary-foreground hover:bg-primary/90"
  },
  pending: {
    label: "Pending", 
    className: "bg-yellow-100 text-yellow-700",
    button: "Negotiating",
    buttonClass: "bg-yellow-500 text-white hover:bg-yellow-600"
  },
  completed: {
    label: "Completed",
    className: "bg-blue-100 text-blue-700", 
    button: "Trade Completed",
    buttonClass: "bg-green-500 text-white"
  },
  cancelled: {
    label: "Cancelled",
    className: "bg-gray-100 text-gray-700",
    button: "Cancelled",
    buttonClass: "bg-gray-500 text-white"
  }
};

const categoryColors = {
  "Plants & Seedlings": "bg-green-100 text-green-700",
  "Seeds": "bg-emerald-100 text-emerald-700",
  "Tools & Equipment": "bg-amber-100 text-amber-700",
  "Soil & Fertilizer": "bg-orange-100 text-orange-700",
  "Pots & Containers": "bg-stone-100 text-stone-700",
  "Other": "bg-gray-100 text-gray-700"
};

// Default images for different categories
const defaultImages = {
  "Plants & Seedlings": "https://images.unsplash.com/photo-1592150621744-aca64f48394a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
  "Seeds": "https://images.unsplash.com/photo-1464207687429-7505649dae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250", 
  "Tools & Equipment": "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
  "Soil & Fertilizer": "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
  "Pots & Containers": "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
  "Other": "https://images.unsplash.com/photo-1485955900006-10f4d324d411?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250"
};

export function TradeCard({ trade }: TradeCardProps) {
  const status = statusConfig[trade.status as keyof typeof statusConfig];
  const categoryColor = categoryColors[trade.category as keyof typeof categoryColors] || categoryColors.Other;
  const defaultImage = defaultImages[trade.category as keyof typeof defaultImages] || defaultImages.Other;
  
  const timeAgo = formatDistanceToNow(new Date(trade.createdAt), { addSuffix: true });
  const userInitials = trade.user.displayName.split(' ').map(n => n[0]).join('').toUpperCase();

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 hover:-translate-y-1">
      <div className="relative">
        <img 
          src={trade.images?.[0] || defaultImage}
          alt={trade.title}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <div className="absolute top-4 left-4">
          <Badge className={status.className}>
            {status.label}
          </Badge>
        </div>
        <div className="absolute top-4 right-4">
          <Button variant="ghost" size="icon" className="bg-white bg-opacity-90 hover:bg-opacity-100">
            <Heart className="w-4 h-4 text-gray-600" />
          </Button>
        </div>
      </div>
      
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h4 className="text-lg font-semibold text-gray-900 mb-1">{trade.title}</h4>
            <div className="flex items-center text-sm text-gray-500 mb-2">
              <MapPin className="w-3 h-3 mr-1" />
              <span>{trade.location}</span>
            </div>
          </div>
          <Badge variant="outline" className={categoryColor}>
            {trade.category.replace(" & ", " ")}
          </Badge>
        </div>
        
        <div className="space-y-3 mb-4">
          <div>
            <span className="text-sm font-medium text-gray-700">Offering:</span>
            <p className="text-sm text-gray-600 line-clamp-2">{trade.offering}</p>
          </div>
          <div>
            <span className="text-sm font-medium text-gray-700">Seeking:</span>
            <p className="text-sm text-gray-600 line-clamp-2">{trade.seeking}</p>
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <span className="text-xs font-medium text-primary">{userInitials}</span>
            </div>
            <span className="text-sm text-gray-700">{trade.user.username}</span>
          </div>
          <div className="flex items-center text-xs text-gray-500">
            <Clock className="w-3 h-3 mr-1" />
            {timeAgo}
          </div>
        </div>
        
        <Link href={`/trades/${trade.id}`}>
          <Button 
            className={`w-full mt-4 ${status.buttonClass}`}
            disabled={trade.status === 'completed' || trade.status === 'cancelled'}
          >
            {trade.status === 'completed' && (
              <CheckCircle className="w-4 h-4 mr-2" />
            )}
            {status.button}
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
