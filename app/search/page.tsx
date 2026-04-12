'use client';

import { useState } from 'react';
import { searchComics } from '@/lib/api';
import { ComicCard } from '@/components/comic-card';
import { Input } from '@/components/ui/input';
import { Search as SearchIcon, Loader2, X } from 'lucide-react';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [submittedQuery, setSubmittedQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  async function performSearch(e?: React.FormEvent) {
    if (e) e.preventDefault();
    
    if (!query.trim()) {
      setResults([]);
      setHasSearched(false);
      setSubmittedQuery('');
      return;
    }

    setIsLoading(true);
    setHasSearched(true);
    setSubmittedQuery(query);
    try {
      const data = await searchComics(query);
      setResults(data.komikList || []);
    } catch (error) {
      console.error('Search failed:', error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col min-h-screen pb-8">
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border px-4 py-3">
        <form onSubmit={performSearch} className="relative">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search comics..."
            className="w-full pl-9 pr-9 bg-muted/50 border-none focus-visible:ring-1"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setResults([]);
                setHasSearched(false);
                setSubmittedQuery('');
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </form>
      </header>

      <main className="flex-1 px-4 py-6">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
            <Loader2 className="w-8 h-8 animate-spin mb-4" />
            <p>Searching...</p>
          </div>
        ) : hasSearched && results.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-muted-foreground text-center">
            <SearchIcon className="w-12 h-12 mb-4 opacity-20" />
            <p>No comics found for &quot;{submittedQuery}&quot;</p>
          </div>
        ) : results.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {results.map((comic: any) => (
              <ComicCard key={comic.slug} comic={comic} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-muted-foreground text-center">
            <SearchIcon className="w-12 h-12 mb-4 opacity-20" />
            <p>Type to start searching</p>
          </div>
        )}
      </main>
    </div>
  );
}
