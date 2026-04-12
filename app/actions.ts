'use server';

import { fetchChapter } from '@/lib/api';

export async function getChapterAction(slug: string) {
  try {
    const data = await fetchChapter(slug);
    return data;
  } catch (error) {
    console.error('Failed to fetch chapter:', error);
    return null;
  }
}
