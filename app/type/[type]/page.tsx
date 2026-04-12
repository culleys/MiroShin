import { fetchComicsByType } from '@/lib/api';
import { ComicCard } from '@/components/comic-card';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default async function TypePage({ params }: { params: Promise<{ type: string }> }) {
  const { type } = await params;
  const data = await fetchComicsByType(type);
  const comics = data.komikList || [];

  const title = type === 'manga' ? 'Anime/Manga' : type.charAt(0).toUpperCase() + type.slice(1);

  return (
    <div className="flex flex-col min-h-screen pb-8">
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border px-4 py-3 flex items-center gap-3">
        <Link href="/" className="p-1 -ml-1 hover:bg-muted rounded-full transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-xl font-bold tracking-tight capitalize">{title}</h1>
      </header>

      <main className="flex-1 px-4 py-6">
        {comics.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {comics.map((comic: any) => (
              <ComicCard key={comic.slug} comic={comic} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-muted-foreground text-center">
            <p>No comics found for this type.</p>
          </div>
        )}
      </main>
    </div>
  );
}
