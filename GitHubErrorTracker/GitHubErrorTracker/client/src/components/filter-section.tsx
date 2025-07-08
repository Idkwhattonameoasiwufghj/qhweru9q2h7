import { useState } from "react";
import { Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Button, Badge } from "@/components/ui-consolidated";
import { Search, MapPin, Filter } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { TradeFilters } from "@/lib/types";

interface FilterSectionProps {
  filters: TradeFilters;
  onFiltersChange: (filters: TradeFilters) => void;
  resultCount?: number;
  totalCount?: number;
}

export function FilterSection({ filters, onFiltersChange, resultCount, totalCount }: FilterSectionProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const { data: meta } = useQuery({
    queryKey: ['/api/meta'],
    queryFn: api.getMeta,
  });

  const handleSearchChange = (value: string) => {
    onFiltersChange({ ...filters, searchTerm: value });
  };

  const handleCategoryChange = (value: string) => {
    onFiltersChange({ ...filters, category: value === "all" ? undefined : value });
  };

  const handleStatusChange = (value: string) => {
    onFiltersChange({ ...filters, status: value === "all" ? undefined : value });
  };

  const clearFilters = () => {
    onFiltersChange({});
  };

  const hasActiveFilters = filters.category || filters.status || filters.searchTerm;

  return (
    <section className="bg-white py-8 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search trades, plants, tools..."
              className="pl-10"
              value={filters.searchTerm || ""}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
          </div>
          
          {/* Filter Controls */}
          <div className="flex flex-wrap gap-4 items-center">
            {/* Category Filter */}
            <Select value={filters.category || "all"} onValueChange={handleCategoryChange}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {meta?.categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {/* Status Filter */}
            <Select value={filters.status || "all"} onValueChange={handleStatusChange}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                {meta?.statuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {/* Location Badge */}
            <Badge variant="secondary" className="flex items-center space-x-2">
              <MapPin className="w-4 h-4" />
              <span>Within 10 miles</span>
            </Badge>
            
            {/* Advanced Filters Toggle */}
            <Button
              variant="ghost"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center space-x-2"
            >
              <Filter className="w-4 h-4" />
              <span>Advanced Filters</span>
            </Button>
          </div>
        </div>

        {/* Active Filters & Results */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-6 gap-4">
          <div className="flex flex-wrap gap-2 items-center">
            {resultCount !== undefined && totalCount !== undefined && (
              <p className="text-gray-600 text-sm">
                Showing {resultCount} of {totalCount} trades
              </p>
            )}
            
            {hasActiveFilters && (
              <>
                <span className="text-gray-400">•</span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={clearFilters}
                  className="text-sm text-primary hover:text-primary-dark"
                >
                  Clear all filters
                </Button>
              </>
            )}
          </div>

          {/* Active Filter Tags */}
          {hasActiveFilters && (
            <div className="flex flex-wrap gap-2">
              {filters.category && (
                <Badge variant="outline" className="flex items-center gap-1">
                  {filters.category}
                  <button 
                    onClick={() => handleCategoryChange("all")}
                    className="ml-1 hover:bg-gray-200 rounded-full p-0.5"
                  >
                    ×
                  </button>
                </Badge>
              )}
              {filters.status && (
                <Badge variant="outline" className="flex items-center gap-1">
                  {filters.status.charAt(0).toUpperCase() + filters.status.slice(1)}
                  <button 
                    onClick={() => handleStatusChange("all")}
                    className="ml-1 hover:bg-gray-200 rounded-full p-0.5"
                  >
                    ×
                  </button>
                </Badge>
              )}
              {filters.searchTerm && (
                <Badge variant="outline" className="flex items-center gap-1">
                  "{filters.searchTerm}"
                  <button 
                    onClick={() => handleSearchChange("")}
                    className="ml-1 hover:bg-gray-200 rounded-full p-0.5"
                  >
                    ×
                  </button>
                </Badge>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
