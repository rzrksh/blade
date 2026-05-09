"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import Footer from "@/components/composition/footer";
import Navbar from "@/components/composition/navbar";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppThemeProvider } from "../context/theme";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
      <AppThemeProvider>
        <TooltipProvider>
          <Toaster position="top-center" />
          <Navbar />
          {children}
          <Footer />
        </TooltipProvider>
      </AppThemeProvider>
    </NextThemesProvider>
  );
};
