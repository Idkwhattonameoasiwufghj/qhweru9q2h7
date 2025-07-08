import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui-consolidated";
import { Search, Bot } from "lucide-react";
import { Link } from "wouter";
import { api } from "@/lib/api";

export function HeroSection() {
  const { data: stats } = useQuery({
    queryKey: ['/api/stats'],
    queryFn: api.getStats,
  });

  return (
    <section className="bg-gradient-to-br from-green-50 to-emerald-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Trade Plants & Garden Supplies with Your Community
            </h2>
            <p className="text-xl text-gray-700 mb-8">
              Connect with fellow gardeners through our Discord-integrated platform. Share plants, seeds, tools, and garden supplies with your local community.
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">
                  {stats?.activeTrades || 0}
                </div>
                <div className="text-sm text-gray-600">Active Trades</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">
                  {stats?.totalUsers || 0}
                </div>
                <div className="text-sm text-gray-600">Gardeners</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">
                  {stats?.completedTrades || 0}
                </div>
                <div className="text-sm text-gray-600">Completed</div>
              </div>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/">
                <Button size="lg" className="flex items-center space-x-2">
                  <Search className="w-5 h-5" />
                  <span>Browse Available Trades</span>
                </Button>
              </Link>
              <Link href="/discord">
                <Button variant="outline" size="lg" className="flex items-center space-x-2">
                  <Bot className="w-5 h-5" />
                  <span>Try Discord Bot</span>
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Hero Image */}
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
              alt="Community garden with diverse plants and gardeners working together" 
              className="rounded-2xl shadow-2xl w-full h-auto"
            />
            
            {/* Floating Discord notification card */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4 max-w-sm">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">New trade posted via Discord!</p>
                  <p className="text-xs text-gray-500">Sarah_Gardens added: Tomato seedlings for herbs</p>
                  <span className="text-xs text-green-600">2 minutes ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
