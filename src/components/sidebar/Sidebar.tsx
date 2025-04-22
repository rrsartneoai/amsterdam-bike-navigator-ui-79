
import { useState } from "react";
import { Filter, ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FilterPanel } from "./FilterPanel";
import { LocationList } from "./LocationList";

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div 
      className={`h-full border-l border-border bg-sidebar transition-all duration-300 ${
        collapsed ? "w-12" : "w-full md:w-96"
      }`}
    >
      {collapsed ? (
        <div className="h-full flex flex-col items-center pt-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setCollapsed(false)}
            className="mb-4"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            className="rotate-90"
          >
            <Filter className="h-5 w-5" />
          </Button>
        </div>
      ) : (
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between p-4">
            <h2 className="text-lg font-medium">Bike Locations</h2>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setCollapsed(true)}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </div>
          <Separator />
          <FilterPanel />
          <Separator />
          <div className="flex-1 overflow-y-auto">
            <LocationList />
          </div>
        </div>
      )}
    </div>
  );
}
