"use client";

import { useState, useEffect } from 'react';
import { PropertyCard } from '@/components/property-card';
import { useAppContext } from '@/context/app-context';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PropertySearch } from '@/components/property-search';

export default function HomePage() {
  const { properties } = useAppContext();
  const [filteredProperties, setFilteredProperties] = useState(properties);

  useEffect(() => {
    setFilteredProperties(properties);
  }, [properties]);

  const handleSearch = (searchTerm: string) => {
    const lowercasedTerm = searchTerm.toLowerCase();
    if (!lowercasedTerm) {
      setFilteredProperties(properties);
      return;
    }
    const filtered = properties.filter(
      (property) =>
        (property.title && property.title.toLowerCase().includes(lowercasedTerm)) ||
        (property.address && property.address.toLowerCase().includes(lowercasedTerm)) ||
        (property.city && property.city.toLowerCase().includes(lowercasedTerm)) ||
        (property.area && property.area.toLowerCase().includes(lowercasedTerm)) ||
        (property.country && property.country.toLowerCase().includes(lowercasedTerm))
    );
    setFilteredProperties(filtered);
  };
  
  return (
    <div className="home-page-background">
      <div className="bg-background/80 backdrop-blur-sm min-h-screen">
        <PropertySearch onSearch={handleSearch} />
        <div className="container mx-auto px-4 py-8 md:px-6">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold font-headline tracking-tight">
              Featured Properties
            </h1>
            <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/80">
              <Link href="/add-property">Post a Property</Link>
            </Button>
          </div>
          {filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} variant="home" />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 border-2 border-dashed rounded-lg bg-card/80">
              <h2 className="text-xl font-semibold">No Properties Found</h2>
              <p className="text-muted-foreground mt-2">
                Your search did not match any properties. Try a different search.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
