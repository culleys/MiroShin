import { fetchLatestComics, fetchPopularComics, fetchTopComics, fetchRecommendedComics } from '@/lib/api';
import { ComicCard } from '@/components/comic-card';
import { PaginatedComicList } from '@/components/paginated-comic-list';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { Logo } from '@/components/logo';

export default async function Home() {
  const [latestRes, popularRes, topRes, recommendedRes] = await Promise.all([
    fetchLatestComics(),
    fetchPopularComics(),
    fetchTopComics(),
    fetchRecommendedComics(),
  ]);

  const latest = latestRes.komikList || [];
  const popular = popularRes.komikList || [];
  const top = topRes.komikList || [];
  const recommended = recommendedRes.komikList || [];

  return (
    <div className="flex flex-col gap-6 pb-8">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border px-4 py-3 flex items-center justify-between">
        <Logo />
      </header>

      {/* Recommended Carousel */}
      <section className="px-4">
        <h2 className="text-lg font-semibold mb-3 flex items-center justify-between">
          Recommended
        </h2>
        <ScrollArea className="w-full whitespace-nowrap pb-4">
          <div className="flex w-max space-x-4">
            {recommended.slice(0, 10).map((comic: any) => (
              <div key={comic.slug} className="w-[140px] shrink-0">
                <ComicCard comic={comic} />
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" className="hidden" />
        </ScrollArea>
      </section>

      {/* Popular & Top Tabs */}
      <section className="px-4">
        <Tabs defaultValue="popular" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="popular">Popular</TabsTrigger>
            <TabsTrigger value="top">Top Rated</TabsTrigger>
          </TabsList>
          <TabsContent value="popular" className="mt-0">
            <PaginatedComicList comics={popular} itemsPerPage={10} />
          </TabsContent>
          <TabsContent value="top" className="mt-0">
            <div className="grid grid-cols-3 gap-3">
              {top.slice(0, 6).map((comic: any) => (
                <ComicCard key={comic.slug} comic={comic} compact lazyLoad />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* Latest Updates */}
      <section className="px-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">Latest Updates</h2>
          <Link href="/latest" className="text-sm text-muted-foreground flex items-center hover:text-primary transition-colors">
            See all <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {latest.map((comic: any) => (
            <ComicCard key={comic.slug} comic={comic} />
          ))}
        </div>
      </section>
    </div>
  );
}
