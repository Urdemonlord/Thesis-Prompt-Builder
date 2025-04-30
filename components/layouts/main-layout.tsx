"use client"

import { useState, useEffect } from "react";
import { Header } from "@/components/layouts/header";
import { Sidebar } from "@/components/layouts/sidebar";
import { MobileDrawer } from "@/components/layouts/mobile-drawer";
import { Footer } from "./footer"

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-1">
        {/* Sidebar for desktop */}
        <Sidebar className="hidden md:flex" />
        
        {/* Mobile drawer */}
        <MobileDrawer 
          isOpen={isMobileDrawerOpen} 
          onClose={() => setIsMobileDrawerOpen(false)} 
        />
        
        <div className="flex flex-col flex-1">
          <Header onMenuClick={() => setIsMobileDrawerOpen(true)} />
          <main className="flex-1">
            {children}
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}