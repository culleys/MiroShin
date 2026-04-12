import { fetchComicDetail } from '@/lib/api';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Star, BookOpen, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

export default async function ComicDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await fetchComicDetail(slug);
  const comic = data.detail;

  if (!comic) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p>Comic not found</p>
        <Link href="/" className="text-primary mt-4">Go back home</Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen pb-8 bg-background">
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border px-4 py-3 flex items-center gap-3">
        <Link href="/" className="p-1 -ml-1 hover:bg-muted rounded-full transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-lg font-bold tracking-tight truncate">{comic.title}</h1>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <div className="relative">
          <div className="absolute inset-0 h-64 w-full overflow-hidden">
            <Image
              src={comic.cover}
              alt={comic.title}
              fill
              className="object-cover blur-md opacity-30 scale-110"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
          </div>
          
          <div className="relative px-4 pt-8 pb-4 flex gap-4">
            <div className="w-32 shrink-0 rounded-lg overflow-hidden shadow-xl border border-border bg-muted aspect-[3/4] relative">
              <Image
                src={comic.cover}
                alt={comic.title}
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col justify-end pb-2">
              <h1 className="text-xl font-bold leading-tight mb-2">{comic.title}</h1>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                {comic.rating && (
                  <div className="flex items-center text-yellow-400 text-sm font-medium">
                    <Star className="w-4 h-4 mr-1 fill-current" />
                    {comic.rating}
                  </div>
                )}
                {comic.type && (
                  <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-4 uppercase tracking-wider">
                    {comic.type}
                  </Badge>
                )}
                {comic.status && (
                  <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-4 uppercase tracking-wider">
                    {comic.status}
                  </Badge>
                )}
              </div>
              <p className="text-xs text-muted-foreground line-clamp-2">
                {comic.author} {comic.artist ? `• ${comic.artist}` : ''}
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="px-4 py-4 flex gap-3">
          {comic.chapters && comic.chapters.length > 0 && (
            <Link 
              href={`/chapter/${comic.chapters[comic.chapters.length - 1].slug}`}
              className="flex-1 bg-primary text-primary-foreground rounded-full py-3 flex items-center justify-center font-semibold text-sm hover:bg-primary/90 transition-colors"
            >
              <BookOpen className="w-4 h-4 mr-2" />
              Read First Chapter
            </Link>
          )}
        </div>

        {/* Synopsis & Info */}
        <div className="px-4 py-4">
          <h3 className="font-semibold mb-2">Synopsis</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {comic.synopsis}
          </p>
          
          <div className="flex flex-wrap gap-2 mt-4">
            {comic.genres?.map((genre: any) => (
              <Link key={genre.slug} href={`/genre/${genre.slug}`}>
                <Badge variant="secondary" className="text-xs font-normal">
                  {genre.title}
                </Badge>
              </Link>
            ))}
          </div>
        </div>

        <Separator className="my-2" />

        {/* Chapters List */}
        <div className="px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Chapters</h3>
            <span className="text-xs text-muted-foreground">{comic.chapters?.length || 0} chapters</span>
          </div>
          
          <div className="flex flex-col gap-2">
            {comic.chapters?.map((chapter: any) => (
              <Link 
                key={chapter.slug} 
                href={`/chapter/${chapter.slug}`}
                className="flex items-center justify-between p-3 rounded-lg border border-border bg-card hover:bg-accent transition-colors"
              >
                <span className="font-medium text-sm">
                  {chapter.slug.split('-').pop() ? `Chapter ${chapter.slug.split('-').pop()}` : chapter.title || 'Chapter'}
                </span>
                <span className="text-xs text-muted-foreground flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  {chapter.date}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
