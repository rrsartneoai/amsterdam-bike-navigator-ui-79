
import React, { useState, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { PointOfInterest, searchPOIs } from '@/data/pointsOfInterest';

interface SearchBarProps {
  onSelectPOI: (poi: PointOfInterest) => void;
}

export function SearchBar({ onSelectPOI }: SearchBarProps) {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<PointOfInterest[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Update search results when search term changes
  useEffect(() => {
    if (searchTerm.length < 2) {
      setResults([]);
      return;
    }
    
    const filteredResults = searchPOIs(searchTerm);
    setResults(filteredResults);
  }, [searchTerm]);

  // Handle POI selection
  const handleSelect = (poi: PointOfInterest) => {
    onSelectPOI(poi);
    setOpen(false);
    setSearchTerm('');
  };

  return (
    <div className="relative w-full">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              ref={inputRef}
              placeholder="Search for attractions, transport, and more..."
              className="pl-10 pr-10 py-6 glass-morphism"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setOpen(true)}
            />
            {searchTerm && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                onClick={() => {
                  setSearchTerm('');
                  inputRef.current?.focus();
                }}
              >
                ✕
              </Button>
            )}
          </div>
        </PopoverTrigger>
        <PopoverContent
          className="p-0 w-[calc(100vw-2rem)] max-w-md"
          align="start"
        >
          <Command>
            <CommandInput placeholder="Search Amsterdam..." className="h-9" />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {results.map((poi) => (
                  <CommandItem
                    key={poi.id}
                    onSelect={() => handleSelect(poi)}
                    className="flex items-start py-2"
                  >
                    <div className="flex flex-col">
                      <span className="font-medium">{poi.name}</span>
                      <span className="text-xs text-muted-foreground">{poi.category}</span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
