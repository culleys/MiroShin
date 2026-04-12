import { fetchChapter } from '@/lib/api';
import Link from 'next/link';
import { ChapterReader } from '@/components/chapter-reader';

export default async function ChapterPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await fetchChapter(slug);
  
  if (!data || !data.success) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p>Chapter not found</p>
        <Link href="/" className="text-primary mt-4">Go back home</Link>
      </div>
    );
  }

  // Extract comic slug from chapter slug (usually comic-slug-chapter-X)
  const comicSlugMatch = slug.match(/(.*?)-chapter-\d+/);
  const comicSlug = comicSlugMatch ? comicSlugMatch[1] : '';

  return <ChapterReader initialChapter={{...data, slug}} comicSlug={comicSlug} />;
}
