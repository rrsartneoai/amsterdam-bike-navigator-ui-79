
import { X, ChevronRight, Clock, Map, Route, Mountain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface RouteModalProps {
  open: boolean;
  onClose: () => void;
}

export function RouteModal({ open, onClose }: RouteModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-0 overflow-hidden">
        <DialogHeader className="p-4 flex flex-row items-center">
          <DialogTitle className="text-xl">Plan Your Route</DialogTitle>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose} 
            className="ml-auto"
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <div className="px-4 pb-2">
          <div className="relative mb-4">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-10 flex flex-col items-center">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <div className="w-0.5 flex-1 bg-gray-300 my-1" />
              <div className="w-3 h-3 rounded-full bg-primary" />
            </div>
            
            <div className="space-y-2">
              <Input 
                placeholder="Starting point" 
                className="pl-12 py-3" 
                defaultValue="Your Current Location"
              />
              <Input 
                placeholder="Destination" 
                className="pl-12 py-3"
              />
            </div>
          </div>

          <div className="flex gap-2 mb-4">
            <Button variant="outline" className="flex-1 h-auto py-2 justify-start">
              <Clock className="mr-2 h-4 w-4" />
              <div className="text-left">
                <div className="text-xs text-muted-foreground">Fastest</div>
                <div className="font-medium">22 min</div>
              </div>
            </Button>
            <Button variant="outline" className="flex-1 h-auto py-2 justify-start">
              <Route className="mr-2 h-4 w-4" />
              <div className="text-left">
                <div className="text-xs text-muted-foreground">Quietest</div>
                <div className="font-medium">26 min</div>
              </div>
            </Button>
            <Button variant="outline" className="flex-1 h-auto py-2 justify-start">
              <Mountain className="mr-2 h-4 w-4" />
              <div className="text-left">
                <div className="text-xs text-muted-foreground">Scenic</div>
                <div className="font-medium">32 min</div>
              </div>
            </Button>
          </div>
        </div>

        <Tabs defaultValue="directions" className="px-4">
          <TabsList className="w-full">
            <TabsTrigger value="directions" className="flex-1">Directions</TabsTrigger>
            <TabsTrigger value="elevation" className="flex-1">Elevation</TabsTrigger>
            <TabsTrigger value="poi" className="flex-1">POI</TabsTrigger>
          </TabsList>
          
          <TabsContent value="directions" className="pt-4 h-64 overflow-y-auto">
            <div className="space-y-4">
              {[
                {
                  instruction: "Start from your current location",
                  distance: "0 m",
                  icon: "arrow-up"
                },
                {
                  instruction: "Head north on Damrak toward Dam",
                  distance: "400 m",
                  icon: "arrow-up"
                },
                {
                  instruction: "Turn right onto Dam",
                  distance: "150 m",
                  icon: "arrow-right"
                },
                {
                  instruction: "Continue onto Raadhuisstraat",
                  distance: "650 m",
                  icon: "arrow-right"
                },
                {
                  instruction: "Turn left onto Prinsengracht",
                  distance: "1.2 km",
                  icon: "arrow-left"
                },
                {
                  instruction: "Turn right onto Leidsestraat",
                  distance: "350 m",
                  icon: "arrow-right"
                },
                {
                  instruction: "Arrive at your destination",
                  distance: "0 m",
                  icon: "map-pin"
                }
              ].map((step, index) => (
                <div key={index} className="flex">
                  <div className="mr-4 flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      {index + 1}
                    </div>
                    {index < 6 && <div className="w-0.5 h-full bg-gray-200 my-1" />}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{step.instruction}</p>
                    <p className="text-sm text-muted-foreground">{step.distance}</p>
                    {index < 6 && <Separator className="mt-4" />}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="elevation" className="pt-4">
            <div className="h-64 flex flex-col items-center justify-center">
              <div className="w-full h-40 relative">
                <div className="absolute inset-0 bg-gradient-to-t from-transparent to-primary/5 rounded-md overflow-hidden">
                  <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="w-full h-full">
                    <path
                      d="M0,40 L0,30 C5,28 10,25 15,30 C20,35 25,20 30,15 C35,10 40,25 45,20 C50,15 55,10 60,5 C65,0 70,10 75,15 C80,20 85,25 90,30 C95,35 100,30 100,30 L100,40 Z"
                      fill="url(#gradient)" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth="0.5"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-muted-foreground px-2">
                  <span>0 km</span>
                  <span>1 km</span>
                  <span>2 km</span>
                  <span>3 km</span>
                </div>
                <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between items-start text-xs text-muted-foreground py-2">
                  <span>25m</span>
                  <span>15m</span>
                  <span>5m</span>
                  <span>0m</span>
                </div>
              </div>
              <div className="mt-4 text-sm">
                <span className="font-medium">Total Elevation Gain:</span> 23m
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="poi" className="pt-4">
            <div className="h-64 space-y-3 overflow-y-auto">
              {[
                {
                  name: "Dam Square",
                  distance: "On route, 0.4 km ahead",
                  category: "Landmark"
                },
                {
                  name: "Royal Palace Amsterdam",
                  distance: "On route, 0.5 km ahead",
                  category: "Historic Site"
                },
                {
                  name: "Amsterdam Museum",
                  distance: "50m from route",
                  category: "Museum"
                },
                {
                  name: "Westerkerk",
                  distance: "On route, 1.1 km ahead",
                  category: "Church"
                },
                {
                  name: "Anne Frank House",
                  distance: "100m from route",
                  category: "Museum"
                },
                {
                  name: "Bloemenmarkt",
                  distance: "On route, 2.2 km ahead",
                  category: "Market"
                }
              ].map((poi, index) => (
                <div key={index} className="flex p-2 border rounded-md">
                  <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center mr-3">
                    <Map className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">{poi.name}</h4>
                    <p className="text-xs text-muted-foreground">{poi.distance}</p>
                    <p className="text-xs bg-secondary px-1.5 py-0.5 rounded inline-block mt-1">{poi.category}</p>
                  </div>
                  <Button variant="ghost" size="icon" className="ml-auto">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="p-4 border-t flex gap-2">
          <Button className="flex-1">Start Navigation</Button>
          <Button variant="outline" className="flex-1">Share Route</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
