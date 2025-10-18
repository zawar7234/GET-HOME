"us"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useAppContext } from '@/context/app-context';
import { cn } from '@/lib/utils';
import { Home, User, Info, Shield, LogOut, PlusCircle } from 'lucide-react';
import { Separator } from './ui/separator';
import { SheetClose, SheetTitle } from './ui/sheet';
import Image from 'next/image';

const navItems = [
  { href: '/home', label: 'Home', icon: Home },
  { href: '/profile', label: 'Profile', icon: User },
  { href: '/about', label: 'About Us', icon: Info },
  { href: '/privacy', label: 'Privacy Policy', icon: Shield },
];

interface NavMenuProps {
    isMobile?: boolean;
}

export function NavMenu({ isMobile = false }: NavMenuProps) {
  const pathname = usePathname();
  const { logout, user } = useAppContext();

  const commonLinkClasses = "flex items-center gap-3 rounded-lg px-3 py-2 text-foreground transition-all hover:bg-primary/10 active:scale-95 active:bg-primary/20";
  const activeLinkClasses = "bg-primary/20 text-primary font-semibold";

  if (isMobile) {
    return (
        <div className="flex h-full flex-col">
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <div className="flex items-center gap-4 border-b p-4">
                {user && (
                  <Image src={user.profilePicture} alt="User profile" width={40} height={40} className="rounded-full" />
                )}
                <Link className="flex items-center gap-2 font-semibold" href="/profile">
                    <span className="">Welcome, {user?.name}</span>
                </Link>
            </div>
            <nav className="flex-1 grid gap-2 p-4">
                {navItems.map((item) => (
                    <SheetClose asChild key={item.href}>
                        <Link
                            href={item.href}
                            className={cn(commonLinkClasses, pathname === item.href && activeLinkClasses)}
                        >
                            <item.icon className="h-4 w-4" />
                            {item.label}
                        </Link>
                    </SheetClose>
                ))}
            </nav>
            <div className="mt-auto p-4 border-t">
                 <SheetClose asChild>
                    <Button onClick={logout} className="w-full justify-start gap-3">
                        <LogOut className="h-4 w-4" />
                        Logout
                    </Button>
                </SheetClose>
            </div>
        </div>
    );
  }

  return (
    <nav className="flex items-center gap-2 text-sm font-medium">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn("px-4 py-2 rounded-md transition-colors hover:bg-accent/50 active:scale-95", pathname === item.href ? "text-primary font-bold bg-accent/80" : "text-muted-foreground")}
        >
          {item.label}
        </Link>
      ))}
      <Separator orientation="vertical" className="h-6 mx-2" />
      <Button onClick={logout} variant="ghost" size="sm">
          <LogOut className="h-4 w-4 mr-2" />
          Logout
      </Button>
      <Button asChild className="ml-2 bg-accent text-accent-foreground hover:bg-accent/80">
          <Link href="/add-property">
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Property
          </Link>
      </Button>
    </nav>
  );
}￼Enter
