
import { Sun, Cloud, CloudRain } from "lucide-react";

export function WeatherWidget() {
  return (
    <div className="flex items-center bg-secondary/30 p-2 rounded-md text-sm">
      <Sun className="h-4 w-4 text-yellow-500 mr-2" />
      <span className="font-medium">18°C</span>
      <span className="text-muted-foreground ml-2">Amsterdam</span>
    </div>
  );
}
