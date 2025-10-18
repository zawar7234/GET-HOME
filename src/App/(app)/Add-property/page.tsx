import { PropertyForm } from '@/components/property-form';

export default function AddPropertyPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:px-6">
      <PropertyForm formType="add" />
    </div>
  );
}
