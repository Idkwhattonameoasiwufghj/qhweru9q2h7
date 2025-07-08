import { Button, Card, CardContent } from "@/components/ui-consolidated";
import { Bot, ExternalLink } from "lucide-react";

export function DiscordSection() {
  return (
    <section className="bg-indigo-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">Discord Bot Integration</h3>
            </div>
            
            <p className="text-xl text-gray-700 mb-8">
              Manage your trades directly from Discord! Our bot makes it easy to create listings, check status, and communicate with fellow gardeners without leaving your favorite platform.
            </p>
            
            {/* Bot Commands */}
            <div className="space-y-4 mb-8">
              <div className="bg-white rounded-lg p-4 border-l-4 border-indigo-500">
                <code className="text-indigo-700 font-mono text-sm">/add-trade</code>
                <p className="text-gray-600 text-sm mt-1">Create a new trade listing</p>
              </div>
              <div className="bg-white rounded-lg p-4 border-l-4 border-green-500">
                <code className="text-green-700 font-mono text-sm">/my-trades</code>
                <p className="text-gray-600 text-sm mt-1">View your active trades</p>
              </div>
              <div className="bg-white rounded-lg p-4 border-l-4 border-primary">
                <code className="text-primary font-mono text-sm">/complete-trade</code>
                <p className="text-gray-600 text-sm mt-1">Mark a trade as completed</p>
              </div>
            </div>
            
            <Button className="bg-indigo-600 hover:bg-indigo-700 flex items-center space-x-2">
              <ExternalLink className="w-4 h-4" />
              <span>Add Bot to Your Server</span>
            </Button>
          </div>
          
          {/* Discord Bot Demo */}
          <Card className="shadow-xl">
            <CardContent className="p-6">
              <div className="bg-gray-800 rounded-lg p-4 text-green-400 font-mono text-sm">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-400 ml-4">#garden-trades</span>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <span className="text-blue-400">GardenBot</span> 
                    <span className="text-gray-500"> Today at 2:14 PM</span>
                  </div>
                  <div className="bg-gray-700 rounded p-3 ml-4">
                    <p className="mb-2">🌱 <strong>New Trade Created!</strong></p>
                    <p><strong>Offering:</strong> 6 Cherokee Purple tomato seedlings</p>
                    <p><strong>Seeking:</strong> Herb seedlings or flower seeds</p>
                    <p><strong>Location:</strong> Brooklyn, NY</p>
                    <p className="text-blue-400 mt-2">View on website →</p>
                  </div>
                  
                  <div className="mt-4">
                    <span className="text-purple-400">Sarah_Gardens</span>
                    <span className="text-gray-500"> Today at 2:15 PM</span>
                  </div>
                  <div className="ml-4">
                    <p>/add-trade</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
