"use client";

import { createContext, useContext, useState } from "react";

interface NavigationContextType {
  // Add your navigation state properties here
  currentPage?: string;
  setIsMobileNavOpen: (open: boolean) => void;
  isMobileNavOpen: boolean;
  closeMobileNav: () => void;
}

export const NavigationContext = createContext<NavigationContextType>({
    setIsMobileNavOpen: () => {},
    isMobileNavOpen: false,
    closeMobileNav: () => {},
})

export default function NavigationProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<string | undefined>(undefined);
  const closeMobileNav = () => setIsMobileNavOpen(false);

  return (
    <NavigationContext
      value={{
        closeMobileNav,
        currentPage,
        setIsMobileNavOpen,
        isMobileNavOpen,
      }}
    >
      {children}
    </NavigationContext>
  );
}
