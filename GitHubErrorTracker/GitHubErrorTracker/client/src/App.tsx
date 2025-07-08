import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

// Pages
import { HomePage, BrowseTradesPage, CreateTradePage, MyTradesPage, TradeDetailsPage, NotFoundPage } from "@/pages-consolidated";
import { DiscordSection } from "@/components/discord-section";
import { AppHeader } from "@/components/app-header";
import { AppFooter } from "@/components/app-footer";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/browse" component={BrowseTradesPage} />
      <Route path="/create" component={CreateTradePage} />
      <Route path="/my-trades" component={MyTradesPage} />
      <Route path="/trade/:id" component={TradeDetailsPage} />
      <Route path="/discord">
        <div className="min-h-screen bg-gray-50">
          <AppHeader />
          <DiscordSection />
          <AppFooter />
        </div>
      </Route>
      <Route component={NotFoundPage} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
