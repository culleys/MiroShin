'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ChevronLeft, ChevronRight, Home, Settings, Loader2, Play, Pause, FastForward } from 'lucide-react';
import { getChapterAction } from '@/app/actions';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type Quality = 'tinggi' | 'sedang' | 'rendah';

const qualityMap = {
  tinggi: 100,
  sedang: 50,
  rendah: 10,
};

interface ChapterData {
  title: string;
  images: string[];
  navigation: {
    next: string | null;
    prev: string | null;
  };
  slug: string;
}

interface ChapterReaderProps {
  initialChapter: ChapterData;
  comicSlug: string;
}

export function ChapterReader({ initialChapter, comicSlug }: ChapterReaderProps) {
  const [chapters, setChapters] = useState<ChapterData[]>([initialChapter]);
  const [quality, setQuality] = useState<Quality>('tinggi');
  const [isLoadingNext, setIsLoadingNext] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [scrollSpeed, setScrollSpeed] = useState(0); // 0: off, 1: slow, 2: med, 3: fast
  const observerTarget = useRef<HTMLDivElement>(null);

  const loadNextChapter = useCallback(async () => {
    const lastChapter = chapters[chapters.length - 1];
    if (!lastChapter.navigation.next || isLoadingNext) return;

    setIsLoadingNext(true);
    const nextData = await getChapterAction(lastChapter.navigation.next);
    if (nextData && nextData.success) {
      setChapters(prev => [...prev, { ...nextData, slug: lastChapter.navigation.next! }]);
    }
    setIsLoadingNext(false);
  }, [chapters, isLoadingNext]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          loadNextChapter();
        }
      },
      { threshold: 0.1, rootMargin: '1000px' }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [loadNextChapter]);

  // Auto scroll effect
  useEffect(() => {
    if (scrollSpeed === 0) return;

    let animationFrameId: number;
    let lastTime = performance.now();

    const scroll = (time: number) => {
      const deltaTime = time - lastTime;
      lastTime = time;
      
      // 1 = 30px/s, 2 = 60px/s, 3 = 120px/s
      const pixelsPerSecond = scrollSpeed === 1 ? 30 : scrollSpeed === 2 ? 60 : 120;
      const scrollAmount = (pixelsPerSecond * deltaTime) / 1000;

      window.scrollBy({ top: scrollAmount, behavior: 'auto' });
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationFrameId);
  }, [scrollSpeed]);

  // Stop auto-scroll on manual interaction
  useEffect(() => {
    const handleInteraction = () => {
      if (scrollSpeed > 0) setScrollSpeed(0);
    };
    
    window.addEventListener('touchstart', handleInteraction, { passive: true });
    window.addEventListener('wheel', handleInteraction, { passive: true });
    
    return () => {
      window.removeEventListener('touchstart', handleInteraction);
      window.removeEventListener('wheel', handleInteraction);
    };
  }, [scrollSpeed]);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const toggleAutoScroll = (e: React.MouseEvent) => {
    e.stopPropagation();
    setScrollSpeed(prev => (prev + 1) % 4);
  };

  return (
    <div 
      className="flex flex-col min-h-screen bg-black text-white relative cursor-pointer"
      onClick={toggleFullscreen}
    >
      {/* Header */}
      <header className={cn(
        "fixed top-0 inset-x-0 w-full max-w-md mx-auto z-40 bg-black/90 backdrop-blur-md border-b border-white/10 px-4 py-3 flex items-center justify-between transition-transform duration-300",
        isFullscreen ? "-translate-y-full" : "translate-y-0"
      )}>
        <div className="flex items-center gap-3 overflow-hidden">
          <Link 
            href={comicSlug ? `/comic/${comicSlug}` : '/'} 
            className="p-1 -ml-1 hover:bg-white/10 rounded-full transition-colors shrink-0"
            onClick={(e) => e.stopPropagation()}
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-sm font-medium truncate">
            {chapters[0].title} {chapters.length > 1 ? `(to ${chapters[chapters.length - 1].title})` : ''}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger 
              className="h-8 w-8 rounded-full hover:bg-white/10 text-white inline-flex items-center justify-center focus:outline-none"
              onClick={(e) => e.stopPropagation()}
            >
              <Settings className="w-4 h-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuRadioGroup value={quality} onValueChange={(v) => setQuality(v as Quality)}>
                <DropdownMenuRadioItem value="tinggi">Tinggi (High)</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="sedang">Sedang (Med)</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="rendah">Rendah (Low)</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <Link 
            href="/" 
            className="p-1 hover:bg-white/10 rounded-full transition-colors shrink-0"
            onClick={(e) => e.stopPropagation()}
          >
            <Home className="w-5 h-5" />
          </Link>
        </div>
      </header>

      {/* Comic Images */}
      <main className="flex-1 flex flex-col w-full max-w-2xl mx-auto pb-16">
        {chapters.map((chapter, chapterIndex) => (
          <div key={chapter.slug} className="flex flex-col w-full">
            {chapterIndex > 0 && (
              <div className="py-8 text-center border-t border-white/10 mt-8">
                <h2 className="text-xl font-bold">{chapter.title}</h2>
              </div>
            )}
            {chapter.images?.map((imgUrl: string, index: number) => (
              <div key={`${chapter.slug}-${index}`} className="relative w-full">
                {quality === 'tinggi' ? (
                  <img
                    src={imgUrl}
                    alt={`Page ${index + 1}`}
                    className="w-full h-auto block"
                    loading={index < 3 && chapterIndex === 0 ? "eager" : "lazy"}
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <Image
                    src={imgUrl}
                    alt={`Page ${index + 1}`}
                    width={800}
                    height={1200}
                    className="w-full h-auto block"
                    quality={qualityMap[quality]}
                    loading={index < 3 && chapterIndex === 0 ? "eager" : "lazy"}
                    referrerPolicy="no-referrer"
                    unoptimized={false}
                  />
                )}
              </div>
            ))}
          </div>
        ))}
        
        {/* Infinite Scroll Target */}
        <div ref={observerTarget} className="h-32 flex items-center justify-center">
          {isLoadingNext && <Loader2 className="w-8 h-8 animate-spin text-white/50" />}
          {!isLoadingNext && !chapters[chapters.length - 1].navigation?.next && (
            <p className="text-white/50 text-sm">End of available chapters</p>
          )}
        </div>
      </main>

      {/* Navigation Footer */}
      <footer className={cn(
        "fixed bottom-0 inset-x-0 w-full max-w-md mx-auto z-40 bg-black/90 backdrop-blur-md border-t border-white/10 px-4 py-4 flex items-center justify-between pb-safe transition-transform duration-300",
        isFullscreen ? "translate-y-full" : "translate-y-0"
      )}>
        {chapters[0].navigation?.prev ? (
          <Link 
            href={`/chapter/${chapters[0].navigation.prev}`}
            className="flex items-center text-sm font-medium hover:text-primary transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Prev
          </Link>
        ) : (
          <div className="w-20" />
        )}
        
        <button 
          onClick={toggleAutoScroll}
          className="flex items-center justify-center gap-2 text-sm font-medium hover:text-primary transition-colors bg-white/10 px-4 py-2 rounded-full"
        >
          {scrollSpeed === 0 && <><Play className="w-4 h-4" /> Auto Scroll</>}
          {scrollSpeed === 1 && <><Play className="w-4 h-4" /> Slow</>}
          {scrollSpeed === 2 && <><FastForward className="w-4 h-4" /> Normal</>}
          {scrollSpeed === 3 && <><FastForward className="w-4 h-4 text-primary" /> Fast</>}
        </button>

        {chapters[chapters.length - 1].navigation?.next ? (
          <Link 
            href={`/chapter/${chapters[chapters.length - 1].navigation.next}`}
            className="flex items-center text-sm font-medium hover:text-primary transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            Next
            <ChevronRight className="w-5 h-5 ml-1" />
          </Link>
        ) : (
          <div className="w-20" />
        )}
      </footer>
    </div>
  );
}
