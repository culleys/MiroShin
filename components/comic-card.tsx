import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';

interface ComicCardProps {
  comic: {
    title: string;
    slug: string;
    cover: string;
    chapter?: string;
    type?: string;
    rating?: string;
  };
  compact?: boolean;
  lazyLoad?: boolean;
}

export function ComicCard({ comic, compact = false, lazyLoad = false }: ComicCardProps) {
  return (
    <Link href={`/comic/${comic.slug}`} className="group block">
      <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-muted">
        <Image
          src={comic.cover}
          alt={comic.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          referrerPolicy="no-referrer"
          sizes="(max-width: 768px) 50vw, 33vw"
          loading={lazyLoad ? "lazy" : undefined}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-2 flex flex-col gap-1">
          {comic.type && !compact && (
            <Badge variant="secondary" className="w-fit text-[10px] px-1.5 py-0 h-4 uppercase tracking-wider bg-primary/80 text-primary-foreground">
              {comic.type}
            </Badge>
          )}
          {comic.chapter && (
            <span className="text-xs font-medium text-white drop-shadow-md">
              {comic.chapter}
            </span>
          )}
        </div>
        {comic.rating && !compact && (
          <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm px-1.5 py-0.5 rounded text-[10px] font-bold text-yellow-400 flex items-center gap-1">
            ★ {comic.rating}
          </div>
        )}
      </div>
      <div className="mt-2">
        <h3 className={`font-semibold leading-tight text-foreground line-clamp-2 ${compact ? 'text-xs' : 'text-sm'}`}>
          {comic.title}
        </h3>
      </div>
    </Link>
  );
}
