
import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { MapView } from "@/components/map/MapView";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { RouteModal } from "@/components/modals/RouteModal";
import { Button } from "@/components/ui/button";
import { Route } from "lucide-react";

const Index = () => {
  const [routeModalOpen, setRouteModalOpen] = useState(false);

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Header />
      
      <div className="flex-1 flex overflow-hidden">
        {/* Main Map Area (70%) */}
        <div className="flex-1 relative">
          <MapView />
          
          {/* Route Planning Button */}
          <div className="absolute bottom-4 left-4 z-10">
            <Button 
              onClick={() => setRouteModalOpen(true)}
              className="flex items-center gap-2"
            >
              <Route className="h-4 w-4" />
              Plan Route
            </Button>
          </div>
        </div>
        
        {/* Sidebar (30%) */}
        <Sidebar />
      </div>
      
      {/* Route Planning Modal */}
      <RouteModal 
        open={routeModalOpen} 
        onClose={() => setRouteModalOpen(false)} 
      />
    </div>
  );
};

export default Index;
