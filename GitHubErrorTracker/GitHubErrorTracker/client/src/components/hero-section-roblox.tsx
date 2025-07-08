import { useQuery } from "@tanstack/react-query";
import { Button, Card, CardContent } from "@/components/ui-consolidated";
import { Search, Bot, Sparkles } from "lucide-react";
import { Link } from "wouter";
import { api } from "@/lib/api";

export function HeroSection() {
  const { data: stats } = useQuery({
    queryKey: ['/api/stats'],
    queryFn: api.getStats,
  });

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <div className="mb-8">
          <div className="text-8xl mb-4 floating-icon">🌱</div>
          <h1 className="text-6xl md:text-7xl font-bold text-primary mb-6 bounce-in">
            Grow a Garden
          </h1>
          <p className="text-2xl text-secondary font-semibold mb-4">
            🌻 The Ultimate Roblox Garden Trading Game! 🌻
          </p>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Plant magical seeds, grow amazing plants, and trade with friends! 
            Build the most beautiful garden in Roblox!
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
          <Link href="/browse">
            <Button className="roblox-button text-2xl px-12 py-6">
              <Search className="w-6 h-6 mr-3" />
              🌿 Browse Plants
            </Button>
          </Link>
          <Link href="/create">
            <Button className="roblox-button bg-gradient-to-r from-purple-500 to-pink-500 text-2xl px-12 py-6">
              🌱 Start Growing
            </Button>
          </Link>
          <Link href="/discord">
            <Button className="roblox-button bg-gradient-to-r from-blue-500 to-cyan-500 text-2xl px-12 py-6">
              <Bot className="w-6 h-6 mr-3" />
              🤖 Game Bot
            </Button>
          </Link>
        </div>

        {/* Game Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="roblox-card p-6 bounce-in">
            <div className="text-6xl mb-4 floating-icon">🌻</div>
            <h3 className="text-2xl font-bold text-primary mb-2">Plant & Grow</h3>
            <p className="text-lg text-muted-foreground">Plant magical seeds and watch them grow into amazing plants!</p>
          </Card>
          <Card className="roblox-card p-6 bounce-in">
            <div className="text-6xl mb-4 floating-icon">🔄</div>
            <h3 className="text-2xl font-bold text-secondary mb-2">Trade & Collect</h3>
            <p className="text-lg text-muted-foreground">Trade plants with friends and collect rare species!</p>
          </Card>
          <Card className="roblox-card p-6 bounce-in">
            <div className="text-6xl mb-4 floating-icon">🏆</div>
            <h3 className="text-2xl font-bold text-accent mb-2">Win Prizes</h3>
            <p className="text-lg text-muted-foreground">Complete garden challenges and earn amazing rewards!</p>
          </Card>
        </div>

        {/* Game Stats */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            <Card className="roblox-card text-center p-4">
              <div className="text-4xl mb-2 floating-icon">🌿</div>
              <div className="text-3xl font-bold text-primary">{stats.activeTrades}</div>
              <div className="text-sm font-semibold text-accent">Growing Now</div>
            </Card>
            <Card className="roblox-card text-center p-4">
              <div className="text-4xl mb-2 floating-icon">👥</div>
              <div className="text-3xl font-bold text-secondary">{stats.totalUsers}</div>
              <div className="text-sm font-semibold text-accent">Gardeners</div>
            </Card>
            <Card className="roblox-card text-center p-4">
              <div className="text-4xl mb-2 floating-icon">🏆</div>
              <div className="text-3xl font-bold text-emerald-600">{stats.completedTrades}</div>
              <div className="text-sm font-semibold text-accent">Harvested</div>
            </Card>
            <Card className="roblox-card text-center p-4">
              <div className="text-4xl mb-2 floating-icon">✨</div>
              <div className="text-3xl font-bold text-purple-600">{stats.totalTrades}</div>
              <div className="text-sm font-semibold text-accent">Total Plants</div>
            </Card>
          </div>
        )}

        {/* Game Bot Preview */}
        <Card className="roblox-card p-6 mt-12 bg-gradient-to-r from-blue-100 to-purple-100">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="text-6xl floating-icon">🤖</div>
            <div>
              <h3 className="text-2xl font-bold text-primary">Garden Bot is here!</h3>
              <p className="text-lg text-muted-foreground">Get instant updates when new plants are available!</p>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 text-left max-w-md mx-auto">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">🌱 New plant available!</p>
                <p className="text-xs text-gray-600">Rainbow Rose seeds - Trade for: Golden Carrots</p>
                <span className="text-xs text-green-600">Just now ✨</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}