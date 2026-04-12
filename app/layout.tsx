import type {Metadata} from 'next';
import './globals.css';
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { BottomNav } from '@/components/bottom-nav';
import { Footer } from '@/components/footer';

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: 'Miroshin',
  description: 'Mobile Web Comic App',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={cn("font-sans dark", inter.variable)}>
      <body suppressHydrationWarning>
        <main className="pb-16 min-h-screen max-w-md mx-auto relative bg-background flex flex-col">
          <div className="flex-1">
            {children}
          </div>
          <Footer />
        </main>
        <BottomNav />
      </body>
    </html>
  );
}
