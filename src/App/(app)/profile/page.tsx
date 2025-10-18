"use client";

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAppContext } from '@/context/app-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import { Edit, Save, Camera, PlusCircle } from 'lucide-react';
import { PropertyCard } from '@/components/property-card';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';

const profileSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  profilePicture: z.string().optional(),
});

export default function ProfilePage() {
  const { user, properties, updateUser, isLoading } = useAppContext();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const userProperties = properties.filter((p) => p.userId === user?.id);

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || '',
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({ name: user.name });
      setPreviewImage(user.profilePicture);
    }
  }, [user, form]);
  
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

  const onSubmit = (values: z.infer<typeof profileSchema>) => {
    updateUser({ name: values.name, profilePicture: previewImage || user?.profilePicture });
    toast({ title: 'Success', description: 'Your profile has been updated.' });
    setIsEditing(false);
  };

  if (isLoading) {
    return (
        <div className="container mx-auto px-4 py-8 md:px-6 space-y-12">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">My Profile</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <Skeleton className="h-32 w-32 rounded-full" />
                        <div className="flex-grow w-full space-y-4">
                            <Skeleton className="h-10 w-full" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <Skeleton className="h-10 w-32" />
                    </div>
                </CardContent>
            </Card>
             <div className="mt-12">
                <div className="flex justify-between items-center mb-8">
                    <Skeleton className="h-8 w-48" />
                    <Skeleton className="h-10 w-36" />
                </div>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="space-y-4">
                            <Skeleton className="h-64 w-full" />
                            <Skeleton className="h-6 w-3/4" />
                            <Skeleton className="h-4 w-1/2" />
                            <Skeleton className="h-10 w-full" />
                        </div>
"use client";

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAppContext } from '@/context/app-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import { Edit, Save, Camera, PlusCircle } from 'lucide-react';
import { PropertyCard } from '@/components/property-card';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';

const profileSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  profilePicture: z.string().optional(),
});

export default function ProfilePage() {
  const { user, properties, updateUser, isLoading } = useAppContext();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const userProperties = properties.filter((p) => p.userId === user?.id);

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || '',
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({ name: user.name });
      setPreviewImage(user.profilePicture);
    }
  }, [user, form]);
  
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

  const onSubmit = (values: z.infer<typeof profileSchema>) => {
    updateUser({ name: values.name, profilePicture: previewImage || user?.profilePicture });
    toast({ title: 'Success', description: 'Your profile has been updated.' });
    setIsEditing(false);
  };

  if (isLoading) {
    return (
        <div className="container mx-auto px-4 py-8 md:px-6 space-y-12">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">My Profile</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <Skeleton className="h-32 w-32 rounded-full" />
                        <div className="flex-grow w-full space-y-4">
                            <Skeleton className="h-10 w-full" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <Skeleton className="h-10 w-32" />
                    </div>
                </CardContent>
            </Card>
             <div className="mt-12">
                <div className="flex justify-between items-center mb-8">
                    <Skeleton className="h-8 w-48" />
                    <Skeleton className="h-10 w-36" />
                </div>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="space-y-4">
                            <Skeleton className="h-64 w-full" />
                            <Skeleton className="h-6 w-3/4" />
                            <Skeleton className="h-4 w-1/2" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                    ))}
                </div>
             </div>
        </div>
    );
  }

  if (!user) return null;

  return (
    <div className="container mx-auto px-4 py-8 md:px-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">My Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="relative">
                  <Image
                    src={previewImage || user.profilePicture}
                    alt="Profile picture"
                    width={128}
                    height={128}
                    className="rounded-full object-cover border-4 border-card"
                    data-ai-hint="person portrait"
                  />
                   {isEditing && (
                     <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full">
                      <label htmlFor="picture" className="cursor-pointer text-white">
                        <Camera className="h-8 w-8" />
                        <input id="picture" type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                      </label>
                    </div>
                   )}
                </div>
                <div className="flex-grow w-full">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your full name" {...field} disabled={!isEditing} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormItem className="mt-4">
                     <FormLabel>Email</FormLabel>
                     <Input value={user.email} disabled />
                  </FormItem>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                {isEditing ? (
                  <>
                    <Button variant="outline" onClick={() => {
                        setIsEditing(false);
                        form.reset({ name: user.name });
                        setPreviewImage(user.profilePicture);
                    }}>Cancel</Button>
                    <Button type="submit"><Save className="mr-2 h-4 w-4" /> Save Changes</Button>
                  </>
                ) : (
                  <Button type="button" onClick={() => setIsEditing(true)}>
                    <Edit className="mr-2 h-4 w-4" /> Edit Profile
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      <div className="mt-12">
        <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold font-headline">My Properties</h2>
            <Button asChild>
                <Link href="/add-property"><PlusCircle className="mr-2 h-4 w-4" /> Add Property</Link>
            </Button>
        </div>
         {userProperties.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {userProperties.map((property) => (
                <PropertyCard key={property.id} property={property} variant="profile" />
            ))}
            </div>
        ) : (
            <div className="text-center py-16 border-2 border-dashed rounded-lg">
                <h2 className="text-xl font-semibold">You haven't listed any properties yet.</h2>
                <p className="text-muted-foreground mt-2">
                    Click the button to add your first property.
                </p>
                <Button asChild className="mt-4">
                    <Link href="/add-property">Add New Property</Link>
                </Button>
            </div>
        )}
      </div>

    </div>
  );
}￼Enter
