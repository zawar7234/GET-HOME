"use cli"use client";

import { useParams } from 'next/navigation';
import { PropertyForm } from '@/components/property-form';
import { useAppContext } from '@/context/app-context';
import { Skeleton } from '@/components/ui/skeleton';

export default function EditPropertyPage() {
  const params = useParams();
  const { id } = params;
  const { properties, isLoading } = useAppContext();

  const property = properties.find((p) => p.id === id);

  if (isLoading) {
    return (
        <div className="container mx-auto px-4 py-8 md:px-6">
            <Skeleton className="h-[800px] w-full" />
        </div>
    );
  }

  if (!property) {
    return (
      <div className="container mx-auto px-4 py-8 md:px-6 text-center">
        <h1 className="text-2xl font-bold">Property not found</h1>
        <p>The property you are trying to edit does not exist.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 md:px-6">
      <PropertyForm formType="edit" property={property} />
    </div>
  );
}￼Enter
