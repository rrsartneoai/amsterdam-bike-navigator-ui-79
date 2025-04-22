
import { useState } from "react";
import { Filter, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function FilterPanel() {
  const [expanded, setExpanded] = useState(true);
  const [priceRange, setPriceRange] = useState([0, 20]);

  return (
    <div className="bg-white/70 dark:bg-black/25 glass-morphism p-4 rounded-xl transition-all mb-4 shadow-md">
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          <h3 className="text-sm font-medium">Filters</h3>
        </div>
        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
          {expanded ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </Button>
      </div>

      {expanded && (
        <div className="mt-4 space-y-4 animate-fade-in">
          {/* Bike Type */}
          <div>
            <label className="text-sm font-medium mb-1.5 block">
              Bike Type
            </label>
            <Select defaultValue="any">
              <SelectTrigger className="w-full glass-morphism bg-white/60 dark:bg-black/40 z-30">
                <SelectValue placeholder="Select bike type" />
              </SelectTrigger>
              <SelectContent className="glass-morphism bg-white/90 dark:bg-black/80 z-50 border border-gray-200 dark:border-gray-600">
                <SelectItem value="any">Any Bike</SelectItem>
                <SelectItem value="city">City Bike</SelectItem>
                <SelectItem value="electric">Electric Bike</SelectItem>
                <SelectItem value="cargo">Cargo Bike</SelectItem>
                <SelectItem value="folding">Folding Bike</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Operator */}
          <div>
            <label className="text-sm font-medium mb-1.5 block">
              Operator
            </label>
            <Select defaultValue="any">
              <SelectTrigger className="w-full glass-morphism bg-white/60 dark:bg-black/40 z-30">
                <SelectValue placeholder="Select operator" />
              </SelectTrigger>
              <SelectContent className="glass-morphism bg-white/90 dark:bg-black/80 z-50 border border-gray-200 dark:border-gray-600">
                <SelectItem value="any">Any Operator</SelectItem>
                <SelectItem value="swapfiets">Swapfiets</SelectItem>
                <SelectItem value="ov-fiets">OV-fiets</SelectItem>
                <SelectItem value="donkey">Donkey Republic</SelectItem>
                <SelectItem value="urbee">Urbee</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Price Range */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-sm font-medium">Price Range</label>
              <span className="text-xs text-muted-foreground">
                €{priceRange[0]} - €{priceRange[1]}
              </span>
            </div>
            <Slider
              defaultValue={[0, 20]}
              max={50}
              step={1}
              onValueChange={(value) => setPriceRange(value as number[])}
              className="my-4"
            />
          </div>

          {/* Amenities */}
          <div>
            <label className="text-sm font-medium mb-1.5 block">
              Amenities
            </label>
            <div className="space-y-2 mt-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="helmet" />
                <label
                  htmlFor="helmet"
                  className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Helmets available
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="child-seat" />
                <label
                  htmlFor="child-seat"
                  className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Child seat available
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="repair" />
                <label
                  htmlFor="repair"
                  className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Repair service
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="electric-charging" />
                <label
                  htmlFor="electric-charging"
                  className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Electric charging
                </label>
              </div>
            </div>
          </div>

          {/* Apply Filters Button */}
          <Button className="w-full mt-2 shadow-md transition transform hover:scale-105 active:animate-pulse">
            Apply Filters
          </Button>
        </div>
      )}
    </div>
  );
}

