
import { useState } from "react";
import { X, MapPin, Clock, Euro, Star, ChevronLeft, ChevronRight, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { bikeLocations } from "@/data/bikeLocations";

interface LocationDetailsModalProps {
  locationId: number;
  onClose: () => void;
}

export function LocationDetailsModal({ locationId, onClose }: LocationDetailsModalProps) {
  const location = bikeLocations.find((loc) => loc.id === locationId);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!location) return null;

  const nextImage = () => {
    setActiveImageIndex((prevIndex) => 
      prevIndex === location.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setActiveImageIndex((prevIndex) => 
      prevIndex === 0 ? location.images.length - 1 : prevIndex - 1
    );
  };

  return (
    <Dialog open={true} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-3xl p-0 overflow-hidden">
        <DialogHeader className="p-4 flex flex-row items-center">
          <DialogTitle className="text-xl">{location.name}</DialogTitle>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose} 
            className="ml-auto"
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        {/* Image Gallery */}
        <div className="relative h-64 bg-gray-100">
          <img 
            src={location.images[activeImageIndex]} 
            alt={location.name} 
            className="w-full h-full object-cover"
          />
          <Button 
            variant="secondary" 
            size="icon" 
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80"
            onClick={prevImage}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button 
            variant="secondary" 
            size="icon" 
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80"
            onClick={nextImage}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
            {location.images.map((_, index) => (
              <div 
                key={index} 
                className={`h-1.5 w-1.5 rounded-full ${
                  index === activeImageIndex ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>

        <Tabs defaultValue="details" className="p-4">
          <TabsList className="w-full">
            <TabsTrigger value="details" className="flex-1">Details</TabsTrigger>
            <TabsTrigger value="bikes" className="flex-1">Available Bikes</TabsTrigger>
            <TabsTrigger value="reviews" className="flex-1">Reviews</TabsTrigger>
          </TabsList>
          
          <TabsContent value="details" className="pt-4">
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Location</h3>
                <div className="flex items-start">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 mr-2" />
                  <div>
                    <p className="text-sm">{location.address}</p>
                    <p className="text-xs text-muted-foreground mt-1">{location.distance} km from your location</p>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-medium mb-2">Hours</h3>
                <div className="flex items-start">
                  <Clock className="h-4 w-4 text-muted-foreground mt-0.5 mr-2" />
                  <div className="text-sm">
                    <p>Monday - Friday: 8:00 - 20:00</p>
                    <p>Saturday: 9:00 - 18:00</p>
                    <p>Sunday: 10:00 - 16:00</p>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-medium mb-2">Pricing</h3>
                <div className="flex items-start">
                  <Euro className="h-4 w-4 text-muted-foreground mt-0.5 mr-2" />
                  <div className="text-sm">
                    <p>Regular bike: €{location.price}/hour</p>
                    <p>Daily rate: €{location.price * 5}/day</p>
                    {location.bikeType === "electric" && (
                      <p>Electric bike: €{Math.round(location.price * 1.5)}/hour</p>
                    )}
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-medium mb-2">Amenities</h3>
                <div className="grid grid-cols-2 gap-2">
                  {["Helmets", "Child seats", "Locks", "Baskets", "Repair tools"].map((amenity) => (
                    <div key={amenity} className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-green-500 mr-2" />
                      <span className="text-sm">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="bikes" className="pt-4">
            <div className="space-y-3">
              {[...Array(location.availability)].map((_, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-md">
                  <div>
                    <p className="font-medium">{location.bikeType === "electric" ? "Electric Bike" : "City Bike"} #{index + 1}</p>
                    <p className="text-xs text-muted-foreground">
                      {location.bikeType === "electric" ? "Battery: 85%" : "Frame size: Medium"}
                    </p>
                  </div>
                  <Button size="sm">Reserve</Button>
                </div>
              ))}
              
              {location.availability === 0 && (
                <div className="text-center py-6">
                  <XCircle className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">No bikes currently available</p>
                  <Button variant="outline" className="mt-4">
                    Get notified when available
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="reviews" className="pt-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Reviews</h3>
                  <div className="flex items-center text-sm mt-1">
                    <div className="flex">
                      {[...Array(5)].map((_, index) => (
                        <Star 
                          key={index} 
                          className={`h-4 w-4 ${
                            index < 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                          }`} 
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-muted-foreground">4.0 (24 reviews)</span>
                  </div>
                </div>
                <Button variant="outline" size="sm">Write a Review</Button>
              </div>
              
              <Separator />
              
              {/* Sample Reviews */}
              {[
                {
                  name: "Emma",
                  date: "2 weeks ago",
                  rating: 5,
                  comment: "Great bikes and very helpful staff! The electric bike was in perfect condition."
                },
                {
                  name: "Lucas",
                  date: "1 month ago",
                  rating: 4,
                  comment: "Good selection of bikes. A bit pricey but worth it for the quality."
                },
                {
                  name: "Sophie",
                  date: "2 months ago",
                  rating: 3,
                  comment: "Decent place but they were out of helmets when I visited."
                }
              ].map((review, index) => (
                <div key={index} className="py-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                        {review.name.charAt(0)}
                      </div>
                      <div className="ml-2">
                        <p className="font-medium">{review.name}</p>
                        <p className="text-xs text-muted-foreground">{review.date}</p>
                      </div>
                    </div>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-3.5 w-3.5 ${
                            i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                          }`} 
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm">{review.comment}</p>
                  {index < 2 && <Separator className="mt-3" />}
                </div>
              ))}
              
              <Button variant="outline" className="w-full">Load More Reviews</Button>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="p-4 border-t flex gap-2">
          <Button className="flex-1">Reserve a Bike</Button>
          <Button variant="outline" className="flex-1">Get Directions</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
