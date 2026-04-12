'use client';

import { useState } from 'react';
import { ComicCard } from '@/components/comic-card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginatedComicListProps {
  comics: any[];
  itemsPerPage?: number;
}

export function PaginatedComicList({ comics, itemsPerPage = 10 }: PaginatedComicListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(comics.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleComics = comics.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-3 gap-3">
        {visibleComics.map((comic) => (
          <ComicCard key={comic.slug} comic={comic} compact lazyLoad />
        ))}
      </div>
      
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="h-8 px-3 text-xs"
          >
            <ChevronLeft className="w-3 h-3 mr-1" /> Prev
          </Button>
          <span className="text-xs text-muted-foreground font-medium">
            {currentPage} / {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="h-8 px-3 text-xs"
          >
            Next <ChevronRight className="w-3 h-3 ml-1" />
          </Button>
        </div>
      )}
    </div>
  );
}
