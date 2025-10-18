"use"use client";

import Image from 'next/image';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAppContext, Property } from '@/context/app-context';
import { Badge } from '@/components/ui/badge';
import { BedDouble, Bath, Phone, MessageSquare, Edit, Trash2, MapPin } from 'lucide-react';
import { DeletePropertyDialog } from './delete-property-dialog';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface PropertyCardProps {
  property: Property;
  variant: 'home' | 'profile';
}

export function PropertyCard({ property, variant }: PropertyCardProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { getCountryByName } = useAppContext();
  
  const country = getCountryByName(property.country);
  
  const formattedRent = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: country?.currency || 'USD',
    minimumFractionDigits: 0,
  }).format(property.rent);

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent((property.address || '') + ', ' + (property.city || '') + ', ' + (property.country || ''))}`;

  return (
    <>
      <Card className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-full active:scale-105">
        <div className="relative h-56 w-full">
          <Image
            src={property.image}
            alt={property.title || 'Property Image'}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            data-ai-hint="apartment building"
          />
        </div>
        <CardHeader className="flex-row justify-between items-start">
            <div>
                <CardTitle className="font-headline truncate mb-2">{property.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{property.address}</p>
            </div>
            <div className="text-right flex-shrink-0 flex items-center gap-2">
                 <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="text-red-500 hover:text-red-700 transition-colors">
                    <MapPin className="h-5 w-5"/>
                </a>
                <Badge className="bg-yellow-400 text-black hover:bg-yellow-500 text-base px-3 py-1 animate-pulse">{`${property.city}, ${property.area}`}</Badge>
            </div>
        </CardHeader>
        <CardContent className="flex-grow space-y-4 pt-0">
            <p className="text-2xl font-bold text-primary">{formattedRent}<span className="text-sm font-normal text-muted-foreground">/month</span></p>
          <div className="flex items-center justify-start gap-4 text-muted-foreground">
            <div className="flex items-center gap-2">
              <BedDouble className="h-5 w-5 text-accent" />
              <span>{property.bedrooms} beds</span>
            </div>
            <div className="flex items-center gap-2">
              <Bath className="h-5 w-5 text-accent" />
              <span>{property.bathrooms} baths</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="bg-muted/50 p-4">
          {variant === 'home' ? (
            <div className="flex w-full gap-2">
              <Button asChild variant="outline" className="w-full">
                <a href={`tel:${property.phone}`}><Phone className="mr-2 h-4 w-4" /> Call</a>
              </Button>
              <Button asChild className={cn("w-full", variant === 'home' && "whatsapp-button")}>
                <a href={`https://wa.me/${property.whatsapp}`} target="_blank" rel="noopener noreferrer"><MessageSquare className="mr-2 h-4 w-4" /> WhatsApp</a>
              </Button>
            </div>
          ) : (
            <div className="flex w-full gap-2">
              <Button asChild variant="outline" className="w-full">
                <Link href={`/edit-property/${property.id}`}><Edit className="mr-2 h-4 w-4" /> Edit</Link>
              </Button>
              <Button variant="destructive" className="w-full" onClick={() => setIsDeleteDialogOpen(true)}>
                <Trash2 className="mr-2 h-4 w-4" /> Delete
              </Button>
            </div>
          )}
        </CardFooter>
      </Card>
      {variant === 'profile' && (
        <DeletePropertyDialog
          propertyId={property.id}
          open={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
        />
      )}
    </>
  );
}￼Enter
