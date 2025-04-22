
import React, { useState } from 'react';
import { InteractiveMap } from '@/components/map/InteractiveMap';
import { Button } from '@/components/ui/button';
import { Menu, X, Moon, Sun, LayersIcon } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const Index = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return false;
  });

  const toggleDarkMode = () => {
    if (typeof window === 'undefined') return;
    
    const root = document.documentElement;
    root.classList.toggle('dark');
    
    setDarkMode(root.classList.contains('dark'));
    localStorage.setItem('theme', root.classList.contains('dark') ? 'dark' : 'light');
  };

  // Check for dark mode preference on mount
  React.useEffect(() => {
    const isDarkMode = localStorage.getItem('theme') === 'dark' || 
      (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    if (isDarkMode && !document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.add('dark');
      setDarkMode(true);
    }
  }, []);

  return (
    <div className="relative h-screen w-full flex flex-col overflow-hidden bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      {/* Header */}
      <header className="relative z-20 glass-morphism border-b shadow-sm">
        <div className="container flex justify-between items-center h-14">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMenuOpen(!menuOpen)}
              className="mr-2 md:hidden"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            <div className="flex items-center">
              <LayersIcon className="h-6 w-6 text-amsterdam-blue mr-2" />
              <h1 className="font-bold text-xl hidden sm:block">Amsterdam Explorer</h1>
              <h1 className="font-bold text-xl sm:hidden">A'dam Explorer</h1>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </header>
      
      {/* Sidebar Menu (Mobile) */}
      {menuOpen && (
        <div className="fixed inset-0 z-10 bg-black/30 md:hidden" onClick={() => setMenuOpen(false)}>
          <div 
            className="absolute left-0 top-14 bottom-0 w-64 glass-morphism animate-slide-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4">
              <h2 className="font-bold text-lg mb-4">Amsterdam Explorer</h2>
              
              <nav className="space-y-1">
                <Button variant="ghost" className="w-full justify-start" disabled>Map View</Button>
                <Button variant="ghost" className="w-full justify-start">About</Button>
                <Button variant="ghost" className="w-full justify-start">Settings</Button>
                <Button variant="ghost" className="w-full justify-start">Help</Button>
              </nav>
              
              <Separator className="my-4" />
              
              <div className="text-sm text-muted-foreground">
                <p className="mb-2">© 2025 Amsterdam Explorer</p>
                <p>All data sourced from official Amsterdam city resources.</p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Main Content */}
      <main className="flex-1 relative overflow-hidden">
        <InteractiveMap />
      </main>
    </div>
  );
};

export default Index;
