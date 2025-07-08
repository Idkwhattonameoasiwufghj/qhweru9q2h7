import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui-consolidated";
import { Plus, Bot, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

export function AppHeader() {
  const [location] = useLocation();

  const navItems = [
    { href: "/", label: "🏡 Home", active: location === "/" },
    { href: "/browse", label: "🌱 Browse Plants", active: location === "/browse" },
    { href: "/create", label: "🌿 Grow Plant", active: location === "/create" },
    { href: "/my-trades", label: "🌻 My Garden", active: location === "/my-trades" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b-4 border-primary bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 shadow-lg">
      <div className="container flex h-20 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-3">
            <div className="text-4xl floating-icon">🌱</div>
            <div>
              <span className="text-2xl font-bold text-primary">
                Grow a Garden
              </span>
              <p className="text-sm text-secondary font-semibold">🎮 Roblox Trading Game</p>
            </div>
          </Link>
          <nav className="flex items-center space-x-6 text-lg font-bold">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`transition-all hover:scale-110 hover:text-primary px-3 py-2 rounded-xl ${
                  item.active ? "text-primary bg-accent roblox-card" : "text-foreground/80"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        
        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <SheetHeader>
              <SheetTitle className="flex items-center text-2xl">
                <div className="text-3xl mr-3">🌱</div>
                Grow a Garden
              </SheetTitle>
            </SheetHeader>
            <div className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
              <div className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`text-lg transition-colors hover:text-primary ${
                      item.active ? "text-primary font-bold" : "text-foreground/80"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </SheetContent>
        </Sheet>
        
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <Link href="/" className="md:hidden flex items-center space-x-2">
              <div className="text-3xl">🌱</div>
              <div>
                <span className="text-xl font-bold text-primary">Grow a Garden</span>
                <p className="text-xs text-secondary">🎮 Roblox Game</p>
              </div>
            </Link>
          </div>
          <nav className="flex items-center gap-3">
            <Link href="/create">
              <Button className="roblox-button text-lg">
                <Plus className="mr-2 h-5 w-5" />
                🌱 Grow Plant
              </Button>
            </Link>
            <Link href="/discord">
              <Button className="roblox-button bg-gradient-to-r from-blue-500 to-purple-500 text-lg border-blue-600">
                <Bot className="mr-2 h-5 w-5" />
                🤖 Bot
              </Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}