"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CountrySelect } from './country-select';
import { useAppContext, Property } from '@/context/app-context';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import { Upload, Loader2 } from 'lucide-react';

const formSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters.'),
  address: z.string().min(10, 'Address must be at least 10 characters.'),
  country: z.string().min(1, 'Country is required.'),
  city: z.string().min(1, 'City is required.'),
  area: z.string().min(1, 'Area is required.'),
  rent: z.coerce.number({invalid_type_error: "Rent must be a number."}).positive('Rent must be a positive number.'),
  bedrooms: z.coerce.number().int().min(1, 'Must have at least 1 bedroom.'),
  bathrooms: z.coerce.number().int().min(1, 'Must have at least 1 bathroom.'),
  hasGas: z.boolean().default(false),
  hasElectricity: z.boolean().default(true),
  phone: z.string().min(10, 'Phone number must be at least 10 digits.'),
  whatsapp: z.string().min(10, 'WhatsApp number must be at least 10 digits.'),
  image: z.string().optional(),
});

type PropertyFormValues = z.infer<typeof formSchema>;

interface PropertyFormProps {
  property?: Property;
  formType: 'add' | 'edit';
}

export function PropertyForm({ property, formType }: PropertyFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const { addProperty, updateProperty, getCountryByName } = useAppContext();
  const [previewImage, setPreviewImage] = useState<string | null>(property?.image || null);
  const [isLoading, setIsLoading] = useState(false);
  
  const defaultCountry = property ? getCountryByName(property.country) : undefined;
  const [selectedCountry, setSelectedCountry] = useState(defaultCountry);

  const form = useForm<PropertyFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues:
      formType === 'edit' && property
        ? { ...property }
        : {
            title: '',
            address: '',
            country: '',
            city: '',
            area: '',
            rent: undefined,
            bedrooms: undefined,
            bathrooms: undefined,
            hasGas: false,
            hasElectricity: true,
            phone: '',
            whatsapp: '',
          },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (values: PropertyFormValues) => {
    setIsLoading(true);

    const propertyData = {
        ...values,
        image: previewImage || 'https://picsum.photos/seed/default/800/600',
    };
    
    try {
      if (formType === 'add') {
          await addProperty(propertyData);
          toast({ title: 'Success!', description: 'Your property has been listed.' });
      } else if (property) {
          await updateProperty({ ...property, ...propertyData });
          toast({ title: 'Success!', description: 'Your property has been updated.' });
      }
      router.push('/profile');
    } catch (error) {
      console.error("Failed to save property:", error);
      toast({ variant: "destructive", title: "Error", description: "Failed to save property. Please try again."})
    } finally {
        setIsLoading(false);
    }
  };
  
  const handleCountryChange = (countryName: string) => {
      form.setValue('country', countryName);
      const countryData = getCountryByName(countryName);
      setSelectedCountry(countryData);
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="font-headline">
          {formType === 'add' ? 'List a New Property' : 'Edit Your Property'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-8">
                <FormField control={form.control} name="title" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Property Title</FormLabel>
                    <FormControl><Input placeholder="e.g., Cozy 2-Bedroom Apartment" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="address" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Address</FormLabel>
                    <FormControl><Textarea placeholder="Enter the full property address..." {...field} rows={3} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                 <FormField control={form.control} name="country" render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Country</FormLabel>
                    <CountrySelect value={field.value} onChange={handleCountryChange} />
                    <FormMessage />
                  </FormItem>
                )} />
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <FormField control={form.control} name="city" render={({ field }) => (
                    <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl><Input placeholder="e.g., New York" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                    )} />
                    <FormField control={form.control} name="area" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Area</FormLabel>
                        <FormControl><Input placeholder="e.g., Downtown" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                    )} />
                 </div>
              </div>
"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CountrySelect } from './country-select';
import { useAppContext, Property } from '@/context/app-context';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import { Upload, Loader2 } from 'lucide-react';

const formSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters.'),
  address: z.string().min(10, 'Address must be at least 10 characters.'),
  country: z.string().min(1, 'Country is required.'),
  city: z.string().min(1, 'City is required.'),
  area: z.string().min(1, 'Area is required.'),
  rent: z.coerce.number({invalid_type_error: "Rent must be a number."}).positive('Rent must be a positive number.'),
  bedrooms: z.coerce.number().int().min(1, 'Must have at least 1 bedroom.'),
  bathrooms: z.coerce.number().int().min(1, 'Must have at least 1 bathroom.'),
  hasGas: z.boolean().default(false),
  hasElectricity: z.boolean().default(true),
  phone: z.string().min(10, 'Phone number must be at least 10 digits.'),
  whatsapp: z.string().min(10, 'WhatsApp number must be at least 10 digits.'),
  image: z.string().optional(),
});

type PropertyFormValues = z.infer<typeof formSchema>;

interface PropertyFormProps {
  property?: Property;
  formType: 'add' | 'edit';
}

export function PropertyForm({ property, formType }: PropertyFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const { addProperty, updateProperty, getCountryByName } = useAppContext();
  const [previewImage, setPreviewImage] = useState<string | null>(property?.image || null);
  const [isLoading, setIsLoading] = useState(false);
  
  const defaultCountry = property ? getCountryByName(property.country) : undefined;
  const [selectedCountry, setSelectedCountry] = useState(defaultCountry);

  const form = useForm<PropertyFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues:
      formType === 'edit' && property
        ? { ...property }
        : {
            title: '',
            address: '',
            country: '',
            city: '',
            area: '',
            rent: undefined,
            bedrooms: undefined,
            bathrooms: undefined,
            hasGas: false,
            hasElectricity: true,
            phone: '',
            whatsapp: '',
          },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (values: PropertyFormValues) => {
    setIsLoading(true);

    const propertyData = {
        ...values,
        image: previewImage || 'https://picsum.photos/seed/default/800/600',
    };
    
    try {
      if (formType === 'add') {
          await addProperty(propertyData);
          toast({ title: 'Success!', description: 'Your property has been listed.' });
      } else if (property) {
          await updateProperty({ ...property, ...propertyData });
          toast({ title: 'Success!', description: 'Your property has been updated.' });
      }
      router.push('/profile');
    } catch (error) {
      console.error("Failed to save property:", error);
      toast({ variant: "destructive", title: "Error", description: "Failed to save property. Please try again."})
    } finally {
        setIsLoading(false);
    }
  };
  
  const handleCountryChange = (countryName: string) => {
      form.setValue('country', countryName);
      const countryData = getCountryByName(countryName);
      setSelectedCountry(countryData);
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="font-headline">
          {formType === 'add' ? 'List a New Property' : 'Edit Your Property'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-8">
                <FormField control={form.control} name="title" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Property Title</FormLabel>
                    <FormControl><Input placeholder="e.g., Cozy 2-Bedroom Apartment" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="address" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Address</FormLabel>
                    <FormControl><Textarea placeholder="Enter the full property address..." {...field} rows={3} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                 <FormField control={form.control} name="country" render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Country</FormLabel>
                    <CountrySelect value={field.value} onChange={handleCountryChange} />
                    <FormMessage />
                  </FormItem>
                )} />
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <FormField control={form.control} name="city" render={({ field }) => (
                    <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl><Input placeholder="e.g., New York" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                    )} />
                    <FormField control={form.control} name="area" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Area</FormLabel>
                        <FormControl><Input placeholder="e.g., Downtown" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                    )} />
                 </div>
              </div>

              <div className="space-y-4">
                 <FormLabel>Property Image</FormLabel>
                  <FormControl>
                    <div className="relative flex justify-center items-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50">
                       <label htmlFor="image-upload" className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                            {previewImage ? (
                                <Image src={previewImage} alt="Preview" fill className="object-cover rounded-lg" />
                            ) : (
                                <div className="text-center text-muted-foreground">
                                    <Upload className="mx-auto h-12 w-12"/>
                                    <p className="mt-2">Click to upload or drag and drop</p>
                                    <p className="text-xs">PNG, JPG, GIF up to 10MB</p>
                                </div>
                            )}
                       </label>
                        <Input id="image-upload" type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                    </div>
                </FormControl>
                <FormMessage />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <FormField control={form.control} name="rent" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Monthly Rent ({selectedCountry?.currency || 'USD'})</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                          {selectedCountry?.currency_symbol || '$'}
                        </span>
                        <Input type="number" placeholder="e.g. 2000" {...field} className="pl-7" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="bedrooms" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bedrooms</FormLabel>
                    <FormControl><Input type="number" placeholder="e.g. 2" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="bathrooms" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bathrooms</FormLabel>
                    <FormControl><Input type="number" placeholder="e.g. 1" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <FormField control={form.control} name="phone" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl><Input type="tel" placeholder="+1 234 567 890" {...field} /></FormControl>
                     <FormDescription>For calls.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )} />
                 <FormField control={form.control} name="whatsapp" render={({ field }) => (
                  <FormItem>
                    <FormLabel>WhatsApp Number</FormLabel>
                    <FormControl><Input type="tel" placeholder="1234567890" {...field} /></FormControl>
                    <FormDescription>Number only, for WhatsApp link.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )} />
            </div>

            <div className="flex items-center space-x-6">
                <FormField control={form.control} name="hasGas" render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                        <div className="space-y-1 leading-none">
                            <FormLabel>Gas Available</FormLabel>
                        </div>
                    </FormItem>
                )} />
                 <FormField control={form.control} name="hasElectricity" render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                        <div className="space-y-1 leading-none">
                            <FormLabel>Electricity Available</FormLabel>
                        </div>
                    </FormItem>
                )} />
            </div>

            <Button type="submit" disabled={isLoading} className="w-full md:w-auto">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {formType === 'add' ? 'Listing...' : 'Updating...'}
                </>
              ) : (
                formType === 'add' ? 'List My Property' : 'Save Changes'
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}￼Enter
