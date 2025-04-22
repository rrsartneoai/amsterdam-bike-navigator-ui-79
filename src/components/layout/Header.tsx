
import { Search, User, Bell, Sun, Moon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { WeatherWidget } from "@/components/widgets/WeatherWidget";
import { useEffect, useState } from "react";

function toggleDarkMode() {
  if (typeof window === "undefined") return;
  const root = window.document.documentElement;
  root.classList.toggle("dark");
  window.localStorage.setItem(
    "theme",
    root.classList.contains("dark") ? "dark" : "light"
  );
}

export function Header() {
  // Automatyczne wymuszenie dark jeśli user miał już ustawiony w localStorage
  useEffect(() => {
    const saved =
      typeof window !== "undefined"
        ? window.localStorage.getItem("theme")
        : null;
    if (saved === "dark" && !window.document.documentElement.classList.contains("dark")) {
      window.document.documentElement.classList.add("dark");
    }
  }, []);

  const [dark, setDark] = useState(() =>
    typeof window !== "undefined"
      ? window.document.documentElement.classList.contains("dark")
      : false
  );

  const handleToggle = () => {
    toggleDarkMode();
    setDark(window.document.documentElement.classList.contains("dark"));
  };

  return (
    <header className="glass-morphism bg-white/70 dark:bg-black/30 border-b border-gray-200 dark:border-gray-800 w-full z-10 backdrop-blur-md transition-all duration-500">
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-primary flex items-center">
              <svg
                viewBox="0 0 24 24"
                className="h-8 w-8 mr-2 fill-amsterdam-blue"
                aria-hidden="true"
              >
                <path d="M16 4.5c0 1.382-1.118 2.5-2.5 2.5S11 5.882 11 4.5 12.118 2 13.5 2 16 3.118 16 4.5z"/>
                <path d="M13.5 9c1.382 0 2.5-1.118 2.5-2.5V8h2V6.5C18 4.015 15.985 2 13.5 2S9 4.015 9 6.5V8h2V6.5c0 1.382 1.118 2.5 2.5 2.5z"/>
                <path d="M18.5 9c1.382 0 2.5-1.118 2.5-2.5V8h2V6.5C23 4.015 20.985 2 18.5 2S14 4.015 14 6.5V8h2V6.5c0 1.382 1.118 2.5 2.5 2.5z"/>
                <path d="M11.29 15.71l.3-.3c.392-.392.692-.868.886-1.41H7.5C5.015 14 3 16.015 3 18.5S5.015 23 7.5 23c1.861 0 3.411-1.103 4.116-2.67l-2.565-2.565L7.5 16.214l1.551 1.551 2.239 2.239c-.502.444-1.153.714-1.863.714a2.497 2.497 0 0 1-2.5-2.5c0-1.381 1.119-2.5 2.5-2.5h5.328c.106-.117.219-.228.34-.33l2.672-2.372 1.334 1.494-5.811 5.159L11.29 15.71z"/>
              </svg>
              Amsterdam Bike Navigator
            </h1>
          </div>

          {/* Weather Widget */}
          <div className="hidden md:block">
            <WeatherWidget />
          </div>

          {/* User icons + przełącznik dark */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleToggle}
              aria-label="Przełącz tryb ciemny"
              className="transition-all hover:scale-110"
            >
              {dark ? (
                <Sun className="h-5 w-5 text-yellow-400" />
              ) : (
                <Moon className="h-5 w-5 text-gray-800 dark:text-gray-200" />
              )}
            </Button>
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              className="pl-10 pr-4 py-2 w-full glass-morphism bg-white/60 dark:bg-black/40"
              placeholder="Search for locations or addresses..."
            />
          </div>
        </div>
      </div>
    </header>
  );
}

