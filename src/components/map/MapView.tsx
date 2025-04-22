
import { useState } from "react";
import { MapPin, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { bikeLocations } from "@/data/bikeLocations";

export function MapView() {
  const [mapStyle, setMapStyle] = useState<string>("streets");

  // Temporary: in production, you would get this from backend
  const userPosition = {
    latitude: 52.3676,
    longitude: 4.9041
  };

  const toggleMapStyle = () => {
    setMapStyle(mapStyle === "streets" ? "satellite" : "streets");
  };

  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-0 bg-gray-100">
        {/* Simplified map placeholder */}
        <div className="h-full w-full flex items-center justify-center flex-col">
          <div className="mb-4 text-center">
            <h3 className="text-lg font-medium">Interactive Map</h3>
            <p className="text-sm text-muted-foreground">MapLibre GL would render here</p>
          </div>
          
          {/* Sample visualization of bike points */}
          <div className="relative w-3/4 h-2/3 border border-gray-300 rounded-lg overflow-hidden bg-white">
            {/* Simplified map background */}
            <div className="absolute inset-0 opacity-50">
              <svg width="100%" height="100%">
                <rect x="10%" y="20%" width="80%" height="2%" fill="#0063AF" />
                <rect x="10%" y="35%" width="80%" height="1%" fill="#0063AF" />
                <rect x="30%" y="10%" width="1%" height="80%" fill="#0063AF" />
                <rect x="50%" y="10%" width="2%" height="80%" fill="#0063AF" />
                <rect x="70%" y="10%" width="1%" height="80%" fill="#0063AF" />
              </svg>
            </div>
            
            {/* User position */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-md animate-pulse" />
            </div>
            
            {/* Sample bike markers */}
            {bikeLocations.map((location, index) => {
              // Just for visual demonstration, not geographically accurate
              const left = 20 + (index * 15);
              const top = 25 + (index * 10);
              
              return (
                <div key={location.id} className="absolute" style={{ left: `${left}%`, top: `${top}%` }}>
                  <div className="relative group">
                    <MapPin 
                      className={`h-6 w-6 ${location.bikeType === 'electric' ? 'text-amsterdam-blue' : 'text-amsterdam-red'} cursor-pointer hover:scale-110 transition-transform`} 
                    />
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white px-2 py-1 rounded shadow-md text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                      {location.name}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Map Controls */}
        <div className="absolute right-4 bottom-4 flex flex-col gap-2">
          <Button variant="secondary" size="icon" className="bg-white shadow-md">+</Button>
          <Button variant="secondary" size="icon" className="bg-white shadow-md">−</Button>
          <Button variant="secondary" size="icon" className="bg-white shadow-md">
            <MapPin className="h-4 w-4" />
          </Button>
          <Button 
            variant="secondary" 
            size="icon" 
            className="bg-white shadow-md"
            onClick={toggleMapStyle}
          >
            <Layers className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
