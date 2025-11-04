"use client";

import {
  BellIcon,
  HomeIcon,
  LogOutIcon,
  MenuIcon,
  MoonIcon,
  SunIcon,
  UserIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { useEffect, useState } from "react";
import { useAuth, SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";

function MobileNavbar() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  // Close the sheet on route change as a safety net
  useEffect(() => {
    if (showMobileMenu) setShowMobileMenu(false);
  }, [pathname]);

  return (
    <div className="flex md:hidden items-center space-x-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="mr-2"
      >
        <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>

      <Sheet open={showMobileMenu} onOpenChange={setShowMobileMenu}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <MenuIcon className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[300px]">
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          <nav className="flex flex-col space-y-4 mt-6">
            <SheetClose asChild>
              <Button variant="ghost" className="flex items-center gap-3 justify-start" asChild>
                <Link href="/">
                  <HomeIcon className="w-4 h-4" />
                  Home
                </Link>
              </Button>
            </SheetClose>

            {isSignedIn ? (
              <>
                <SheetClose asChild>
                  <Button variant="ghost" className="flex items-center gap-3 justify-start" asChild>
                    <Link href="/notifications">
                      <BellIcon className="w-4 h-4" />
                      Notifications
                    </Link>
                  </Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button variant="ghost" className="flex items-center gap-3 justify-start" asChild>
                    <Link href={
                      user
                        ? `/profile/${encodeURIComponent(user.username ?? user.emailAddresses[0].emailAddress.split("@")[0])}`
                        : "/profile"
                    }>
                      <UserIcon className="w-4 h-4" />
                      Profile
                    </Link>
                  </Button>
                </SheetClose>
                <SignOutButton>
                  <SheetClose asChild>
                    <Button variant="ghost" className="flex items-center gap-3 justify-start w-full">
                      <LogOutIcon className="w-4 h-4" />
                      Logout
                    </Button>
                  </SheetClose>
                </SignOutButton>
              </>
            ) : (
              <SignInButton mode="modal">
                <SheetClose asChild>
                  <Button variant="default" className="w-full">
                    Sign In
                  </Button>
                </SheetClose>
              </SignInButton>
            )}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default MobileNavbar;