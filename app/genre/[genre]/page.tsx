import { fetchComicsByGenre } from '@/lib/api';
import { ComicCard } from '@/components/comic-card';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default async function GenrePage({ params }: { params: Promise<{ genre: string }> }) {
  const { genre } = await params;
  const data = await fetchComicsByGenre(genre);
  const comics = data.komikList || [];

  return (
    <div className="flex flex-col min-h-screen pb-8">
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border px-4 py-3 flex items-center gap-3">
        <Link href="/genres" className="p-1 -ml-1 hover:bg-muted rounded-full transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-xl font-bold tracking-tight capitalize">{genre.replace(/-/g, ' ')}</h1>
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
            <p>No comics found for this genre.</p>
          </div>
        )}
      </main>
    </div>
  );
}
