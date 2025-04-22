
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
    <div className="min-h-screen flex flex-col overflow-hidden bg-gradient-to-tr from-[#fdfcfb] to-[#e2d1c3] dark:from-[#222] dark:to-[#444] transition-colors duration-700">
      <Header />

      <div className="flex-1 flex overflow-hidden">
        {/* Main Map Area (70%) */}
        <div className="flex-1 relative">
          <MapView />

          {/* Route Planning Button */}
          <div className="absolute bottom-4 left-4 z-10">
            <Button
              onClick={() => setRouteModalOpen(true)}
              className="flex items-center gap-2 shadow-lg transition duration-300 hover:scale-105 active:animate-pulse"
              style={{ boxShadow: "0 6px 24px 0 rgba(0,0,0,0.14)" }}
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
      <div className={routeModalOpen ? "animate-fade-in" : ""}>
        <RouteModal
          open={routeModalOpen}
          onClose={() => setRouteModalOpen(false)}
        />
      </div>
    </div>
  );
};

export default Index;

