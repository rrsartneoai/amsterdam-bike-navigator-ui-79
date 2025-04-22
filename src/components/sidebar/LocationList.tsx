
import { useState } from "react";
import { MapPin, Clock, Euro, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { bikeLocations } from "@/data/bikeLocations";
import { LocationDetailsModal } from "../modals/LocationDetailsModal";

export function LocationList() {
  const [selectedLocation, setSelectedLocation] = useState<number | null>(null);

  return (
    <div className="p-2">
      {bikeLocations.map((location) => (
        <div key={location.id} className="mb-4">
          <div className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-base">{location.name}</h3>
                <div className="flex items-center text-sm text-muted-foreground mt-1">
                  <MapPin className="h-3.5 w-3.5 mr-1" />
                  <span>{location.distance} km away</span>
                </div>
              </div>
              <div className={`px-2 py-1 rounded-full text-xs ${
                location.availability > 5 
                  ? "bg-green-100 text-green-800" 
                  : location.availability > 0 
                    ? "bg-yellow-100 text-yellow-800" 
                    : "bg-red-100 text-red-800"
              }`}>
                {location.availability > 0 
                  ? `${location.availability} bikes available` 
                  : "No bikes available"}
              </div>
            </div>

            <div className="flex items-center mt-2 text-sm">
              <div className="flex items-center text-muted-foreground mr-3">
                <Clock className="h-3.5 w-3.5 mr-1" />
                <span>{location.openingHours}</span>
              </div>
              <div className="flex items-center font-medium">
                <Euro className="h-3.5 w-3.5 mr-1" />
                <span>From €{location.price}/hour</span>
              </div>
            </div>

            <div className="flex items-center mt-3 pt-2 border-t border-gray-100">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                {location.operator}
                {location.bikeType === "electric" ? (
                  <span className="bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded-full">Electric</span>
                ) : (
                  <span className="bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded-full">Regular</span>
                )}
              </div>
              <div className="ml-auto">
                <Button 
                  size="sm" 
                  onClick={() => setSelectedLocation(location.id)}
                >
                  View Details
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Location Details Modal */}
      {selectedLocation && (
        <LocationDetailsModal
          locationId={selectedLocation}
          onClose={() => setSelectedLocation(null)}
        />
      )}
    </div>
  );
}
