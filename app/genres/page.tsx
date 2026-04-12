import { fetchGenres } from '@/lib/api';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

export default async function GenresPage() {
  const genresRes = await fetchGenres();
  const genres = genresRes.genres || [];

  return (
    <div className="flex flex-col min-h-screen pb-8">
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border px-4 py-3">
        <h1 className="text-xl font-bold tracking-tight">Genres</h1>
      </header>

      <main className="flex-1 px-4 py-6">
        <div className="flex flex-wrap gap-2">
          {genres.map((genre: any) => (
            <Link key={genre.slug} href={`/genre/${genre.slug}`}>
              <Badge variant="secondary" className="text-sm px-3 py-1 hover:bg-primary hover:text-primary-foreground transition-colors">
                {genre.title}
              </Badge>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
