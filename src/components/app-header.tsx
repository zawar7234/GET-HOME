"use client";

import Link from 'next/link';
import { Sheet, SheetTrigger, SheetContent, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Building2, Menu } from 'lucide-react';
import { NavMenu } from './nav-menu';

export function AppHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/home" className="flex items-center gap-2">
          <Building2 className="h-7 w-7 text-primary" />
          <span className="text-xl font-bold font-headline tracking-tight text-primary">
            GET HOME
          </span>
        </Link>
        <div className="hidden md:block">
            <NavMenu />
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="p-0">
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <NavMenu isMobile={true} />
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
