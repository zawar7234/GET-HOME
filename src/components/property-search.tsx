"use client""use client";

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

interface PropertySearchProps {
  onSearch: (searchTerm: string) => void;
}

export function PropertySearch({ onSearch }: PropertySearchProps) {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(searchTerm);
    }, 300); // Debounce search input

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, onSearch]);


  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <div className="py-12 bg-primary/10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-2 font-headline">
            Get Home
          </h2>
          <p className="text-center text-muted-foreground mb-6">
            Find your next perfect place to live.
          </p>
          <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 bg-card p-2 rounded-lg shadow-lg">
            <Input
              type="text"
              placeholder="Search by title, address, city, area or country..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <Button type="submit" size="icon">
              <Search className="h-5 w-5" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}￼Enter
