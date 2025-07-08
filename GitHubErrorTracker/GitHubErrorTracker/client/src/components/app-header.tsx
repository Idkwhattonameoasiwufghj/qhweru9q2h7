import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui-consolidated";
import { Badge } from "@/components/ui-consolidated";
import { Sprout, Plus, Bot, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

export function AppHeader() {
  const [location] = useLocation();

  const navItems = [
    { href: "/", label: "Browse Trades", active: location === "/" },
    { href: "/my-trades", label: "My Trades", active: location === "/my-trades" },
    { href: "/discord", label: "Discord Bot", active: location === "/discord" },
  ];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Navigation */}
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Sprout className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Garden Trade Hub</h1>
                <p className="text-xs text-gray-500">Plant & Supply Trading</p>
              </div>
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-6">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <button
                    className={`pb-4 transition-colors ${
                      item.active 
                        ? "text-primary font-medium border-b-2 border-primary" 
                        : "text-gray-600 hover:text-primary"
                    }`}
                  >
                    {item.label}
                  </button>
                </Link>
              ))}
            </nav>
          </div>
          
          {/* User Actions */}
          <div className="flex items-center space-x-4">
            <Link href="/create-trade">
              <Button className="hidden sm:flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Create Trade</span>
              </Button>
            </Link>
            
            {/* Discord Integration Status */}
            <Badge variant="secondary" className="hidden sm:flex items-center space-x-2 bg-emerald-100 text-emerald-700">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span>Discord Connected</span>
            </Badge>
            
            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col space-y-4 mt-8">
                  {navItems.map((item) => (
                    <Link key={item.href} href={item.href}>
                      <button className="text-left w-full py-2 text-lg hover:text-primary transition-colors">
                        {item.label}
                      </button>
                    </Link>
                  ))}
                  <Link href="/create-trade">
                    <Button className="w-full mt-4">
                      <Plus className="w-4 h-4 mr-2" />
                      Create Trade
                    </Button>
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
