import React from "react";
import { Link, useLocation, useParams } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Input, Textarea, Label, Badge, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui-consolidated";
import { AppHeader } from "@/components/app-header-roblox";
import { AppFooter } from "@/components/app-footer";
import { HeroSection } from "@/components/hero-section-roblox";
import { FilterSection } from "@/components/filter-section";
import { TradeCard } from "@/components/trade-card-roblox";
import { DiscordSection } from "@/components/discord-section";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { api } from "@/lib/api";
import { insertTradeSchema, TRADE_CATEGORIES, TRADE_STATUSES } from "@shared/schema";
import type { TradeFilters, TradeWithUser, InsertTrade } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { queryClient } from "@/lib/queryClient";
import { 
  MapPin, 
  Calendar, 
  User, 
  MessageCircle, 
  CheckCircle, 
  Clock, 
  XCircle, 
  Pause,
  ArrowLeft,
  ExternalLink,
  Leaf,
  Users,
  TrendingUp,
  Package
} from "lucide-react";

// Home Page
export function HomePage() {
  const { data: stats } = useQuery({
    queryKey: ['/api/stats'],
  });

  const { data: trades = [] } = useQuery<TradeWithUser[]>({
    queryKey: ['/api/trades'],
  });

  const recentTrades = trades.slice(0, 6);

  return (
    <div className="min-h-screen game-bg">
      <AppHeader />
      
      <main className="container mx-auto px-4 py-8">
        <HeroSection />
        
        {/* Game Stats Section */}
        {stats && (
          <section className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-primary mb-2 floating-icon">🌱 Garden Stats 🌱</h2>
              <p className="text-lg text-muted-foreground">See how our garden community is growing!</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="roblox-card text-center p-6 bounce-in">
                <div className="flex items-center justify-center mb-4">
                  <div className="text-6xl floating-icon">🌿</div>
                </div>
                <div className="text-3xl font-bold text-primary">{stats.totalTrades}</div>
                <div className="text-lg font-semibold text-accent">Total Plants</div>
              </Card>
              <Card className="roblox-card text-center p-6 bounce-in">
                <div className="flex items-center justify-center mb-4">
                  <div className="text-6xl floating-icon">🌻</div>
                </div>
                <div className="text-3xl font-bold text-secondary">{stats.activeTrades}</div>
                <div className="text-lg font-semibold text-accent">Growing Now</div>
              </Card>
              <Card className="roblox-card text-center p-6 bounce-in">
                <div className="flex items-center justify-center mb-4">
                  <div className="text-6xl floating-icon">🏆</div>
                </div>
                <div className="text-3xl font-bold text-emerald-600">{stats.completedTrades}</div>
                <div className="text-lg font-semibold text-accent">Harvested</div>
              </Card>
              <Card className="roblox-card text-center p-6 bounce-in">
                <div className="flex items-center justify-center mb-4">
                  <div className="text-6xl floating-icon">👥</div>
                </div>
                <div className="text-3xl font-bold text-purple-600">{stats.totalUsers}</div>
                <div className="text-lg font-semibold text-accent">Gardeners</div>
              </Card>
            </div>
          </section>
        )}

        {/* Recent Plants */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-4xl font-bold text-primary mb-2">🌸 Latest Plants 🌸</h2>
            <Link href="/browse">
              <Button className="roblox-button">🔍 View All Plants</Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentTrades.map((trade) => (
              <TradeCard key={trade.id} trade={trade} />
            ))}
          </div>
        </section>

        <DiscordSection />
      </main>
      
      <AppFooter />
    </div>
  );
}

// Browse Trades Page
export function BrowseTradesPage() {
  const [filters, setFilters] = React.useState<TradeFilters>({});
  
  const { data: trades = [] } = useQuery<TradeWithUser[]>({
    queryKey: ['/api/trades', filters],
    queryFn: () => api.getTrades(filters),
  });

  const { data: meta } = useQuery({
    queryKey: ['/api/meta'],
  });

  return (
    <div className="min-h-screen game-bg">
      <AppHeader />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <div className="text-8xl mb-4 floating-icon">🌱</div>
          <h1 className="text-5xl font-bold text-primary mb-4">🌿 Browse Plants 🌿</h1>
          <p className="text-xl text-secondary font-semibold">
            Discover amazing plants from gardeners in your community!
          </p>
        </div>

        <FilterSection 
          filters={filters} 
          onFiltersChange={setFilters}
          resultCount={trades.length}
          totalCount={trades.length}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trades.map((trade) => (
            <TradeCard key={trade.id} trade={trade} />
          ))}
        </div>

        {trades.length === 0 && (
          <div className="text-center py-12">
            <div className="text-8xl mb-4 floating-icon">🥺</div>
            <Card className="roblox-card max-w-lg mx-auto p-8">
              <h3 className="text-3xl font-bold text-primary mb-4">No Plants Found!</h3>
              <p className="text-lg text-muted-foreground mb-6">
                Try different filters or be the first to plant something amazing!
              </p>
              <Link href="/create">
                <Button className="roblox-button text-xl px-8 py-4">
                  🌱 Start Growing
                </Button>
              </Link>
            </Card>
          </div>
        )}
      </main>
      
      <AppFooter />
    </div>
  );
}

// Create Trade Page
export function CreateTradePage() {
  const [, navigate] = useLocation();
  const { toast } = useToast();

  const form = useForm<InsertTrade>({
    resolver: zodResolver(insertTradeSchema),
    defaultValues: {
      title: '',
      description: '',
      category: '',
      offering: '',
      seeking: '',
      location: '',
      userId: 1, // Hardcoded for demo
    },
  });

  const createTradeMutation = useMutation({
    mutationFn: api.createTrade,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['/api/trades'] });
      toast({
        title: "Trade created successfully!",
        description: "Your trade listing is now live.",
      });
      navigate(`/trade/${data.id}`);
    },
    onError: (error) => {
      toast({
        title: "Error creating trade",
        description: "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (values: InsertTrade) => {
    createTradeMutation.mutate(values);
  };

  return (
    <div className="min-h-screen game-bg">
      <AppHeader />
      
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="mb-8 text-center">
          <div className="text-8xl mb-4 floating-icon">🌱</div>
          <h1 className="text-5xl font-bold text-primary mb-4">🌿 Grow a Plant 🌿</h1>
          <p className="text-xl text-secondary font-semibold">
            Plant something amazing and share it with friends!
          </p>
        </div>

        <Card className="roblox-card bg-gradient-to-br from-white to-green-50">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-primary text-center">🌻 Plant Details 🌻</CardTitle>
            <CardDescription className="text-lg text-center text-secondary font-semibold">
              Tell everyone about your amazing plant!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xl font-bold text-primary">🌸 Plant Name</FormLabel>
                      <FormControl>
                        <Input className="text-lg p-4 border-2 border-primary rounded-xl" placeholder="e.g., Magical Rainbow Roses" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xl font-bold text-primary">🏷️ Plant Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="text-lg p-4 border-2 border-primary rounded-xl">
                            <SelectValue placeholder="Choose your plant type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="border-2 border-primary rounded-xl">
                          {TRADE_CATEGORIES.map((category) => (
                            <SelectItem key={category} value={category} className="text-lg">
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="offering"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xl font-bold text-primary">🌿 What I'm Growing</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tell everyone about your amazing plant! What makes it special? How did you grow it?"
                          className="min-h-[120px] text-lg p-4 border-2 border-primary rounded-xl"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="seeking"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xl font-bold text-primary">🌱 What I Want</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="What plants would you like to trade for? Be specific about what you're looking for!"
                          className="min-h-[120px] text-lg p-4 border-2 border-primary rounded-xl"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xl font-bold text-primary">📝 Special Notes</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tell us more cool facts about your plant! Any special care tips or fun stories?"
                          className="min-h-[100px] text-lg p-4 border-2 border-primary rounded-xl"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xl font-bold text-primary">📍 My Garden Location</FormLabel>
                      <FormControl>
                        <Input className="text-lg p-4 border-2 border-primary rounded-xl" placeholder="e.g., Roblox City Gardens" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex gap-4 pt-4">
                  <Button 
                    type="submit" 
                    disabled={createTradeMutation.isPending}
                    className="roblox-button flex-1 text-2xl py-6"
                  >
                    {createTradeMutation.isPending ? "🌱 Planting..." : "🌿 Plant My Garden!"}
                  </Button>
                  <Button 
                    type="button" 
                    className="roblox-button bg-gradient-to-r from-red-500 to-pink-500 text-xl py-6"
                    onClick={() => navigate("/browse")}
                  >
                    ❌ Cancel
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </main>
      
      <AppFooter />
    </div>
  );
}

// Trade Details Page
export function TradeDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [, navigate] = useLocation();
  const { toast } = useToast();

  const { data: trade, isLoading } = useQuery<TradeWithUser>({
    queryKey: ['/api/trades', id],
    queryFn: () => api.getTrade(parseInt(id!)),
    enabled: !!id,
  });

  const updateTradeMutation = useMutation({
    mutationFn: api.updateTrade,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/trades'] });
      toast({
        title: "Trade updated successfully!",
      });
    },
  });

  const statusConfig = {
    open: { label: "Open", className: "bg-green-100 text-green-800", icon: Clock },
    pending: { label: "Pending", className: "bg-yellow-100 text-yellow-800", icon: Pause },
    completed: { label: "Completed", className: "bg-blue-100 text-blue-800", icon: CheckCircle },
    cancelled: { label: "Cancelled", className: "bg-red-100 text-red-800", icon: XCircle },
  };

  const categoryColors = {
    "Plants & Seedlings": "bg-green-100 text-green-800",
    "Seeds": "bg-amber-100 text-amber-800",
    "Tools & Equipment": "bg-blue-100 text-blue-800",
    "Soil & Fertilizers": "bg-orange-100 text-orange-800",
    "Pots & Containers": "bg-purple-100 text-purple-800",
    "Other": "bg-gray-100 text-gray-800",
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <AppHeader />
        <main className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </main>
        <AppFooter />
      </div>
    );
  }

  if (!trade) {
    return (
      <div className="min-h-screen bg-background">
        <AppHeader />
        <main className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Trade Not Found</h1>
          <p className="text-muted-foreground mb-4">The trade you're looking for doesn't exist.</p>
          <Button onClick={() => navigate("/browse")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Browse
          </Button>
        </main>
        <AppFooter />
      </div>
    );
  }

  const handleStatusChange = (newStatus: string) => {
    updateTradeMutation.mutate({
      id: trade.id,
      status: newStatus,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6">
          <Button variant="ghost" onClick={() => navigate("/browse")} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Browse
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
              <div className="flex-1">
                <CardTitle className="text-2xl mb-2">{trade.title}</CardTitle>
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <Badge className={statusConfig[trade.status as keyof typeof statusConfig].className}>
                    {statusConfig[trade.status as keyof typeof statusConfig].icon && 
                      React.createElement(statusConfig[trade.status as keyof typeof statusConfig].icon, { className: "w-3 h-3 mr-1" })
                    }
                    {statusConfig[trade.status as keyof typeof statusConfig].label}
                  </Badge>
                  <Badge variant="outline" className={categoryColors[trade.category as keyof typeof categoryColors]}>
                    {trade.category}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {trade.user.displayName}
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {trade.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(trade.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg text-green-700">What I'm Offering</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground whitespace-pre-wrap">{trade.offering}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg text-blue-700">What I'm Seeking</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground whitespace-pre-wrap">{trade.seeking}</p>
                </CardContent>
              </Card>
            </div>

            {trade.description && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Additional Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground whitespace-pre-wrap">{trade.description}</p>
                </CardContent>
              </Card>
            )}

            <div className="flex flex-wrap gap-4">
              <Button className="flex-1 sm:flex-none">
                <MessageCircle className="w-4 h-4 mr-2" />
                Contact Trader
              </Button>
              {trade.userId === 1 && ( // Show admin actions for demo user
                <Select onValueChange={handleStatusChange} defaultValue={trade.status}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {TRADE_STATUSES.map((status) => (
                      <SelectItem key={status} value={status}>
                        {statusConfig[status as keyof typeof statusConfig].label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
          </CardContent>
        </Card>
      </main>
      
      <AppFooter />
    </div>
  );
}

// My Trades Page
export function MyTradesPage() {
  const { data: trades = [] } = useQuery<TradeWithUser[]>({
    queryKey: ['/api/trades', { userId: 1 }],
    queryFn: () => api.getTrades({ userId: 1 }),
  });

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">My Trades</h1>
            <p className="text-muted-foreground">
              Manage your active and completed trade listings
            </p>
          </div>
          <Link href="/create">
            <Button>Create New Trade</Button>
          </Link>
        </div>

        {trades.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <Leaf className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-muted-foreground mb-2">No trades yet</h3>
              <p className="text-muted-foreground mb-4">Create your first trade to get started!</p>
              <Link href="/create">
                <Button>Create Trade</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trades.map((trade) => (
              <TradeCard key={trade.id} trade={trade} />
            ))}
          </div>
        )}
      </main>
      
      <AppFooter />
    </div>
  );
}

// Not Found Page
export function NotFoundPage() {
  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center py-20">
          <h1 className="text-6xl font-bold text-muted-foreground mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-foreground mb-4">Page Not Found</h2>
          <p className="text-muted-foreground mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link href="/">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </main>
      
      <AppFooter />
    </div>
  );
}