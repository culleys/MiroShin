export const API_BASE_URL = 'https://www.sankavollerei.com/comic/bacakomik';

export async function fetchLatestComics() {
  const res = await fetch(`${API_BASE_URL}/latest`, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error('Failed to fetch latest comics');
  return res.json();
}

export async function fetchPopularComics() {
  const res = await fetch(`${API_BASE_URL}/populer`, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error('Failed to fetch popular comics');
  return res.json();
}

export async function fetchTopComics() {
  const res = await fetch(`${API_BASE_URL}/top`, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error('Failed to fetch top comics');
  return res.json();
}

export async function fetchRecommendedComics() {
  const res = await fetch(`${API_BASE_URL}/recomen`, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error('Failed to fetch recommended comics');
  return res.json();
}

export async function fetchComicDetail(slug: string) {
  const res = await fetch(`${API_BASE_URL}/detail/${slug}`, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error('Failed to fetch comic detail');
  return res.json();
}

export async function fetchChapter(slug: string) {
  const res = await fetch(`${API_BASE_URL}/chapter/${slug}`, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error('Failed to fetch chapter');
  return res.json();
}

export async function searchComics(query: string) {
  const res = await fetch(`${API_BASE_URL}/search/${query}`);
  if (!res.ok) throw new Error('Failed to search comics');
  return res.json();
}

export async function fetchGenres() {
  const res = await fetch(`${API_BASE_URL}/genres`, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error('Failed to fetch genres');
  return res.json();
}

export async function fetchComicsByGenre(genre: string) {
  const res = await fetch(`${API_BASE_URL}/genre/${genre}`, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error('Failed to fetch comics by genre');
  return res.json();
}

export async function fetchComicsByType(type: string) {
  const res = await fetch(`${API_BASE_URL}/only/${type}`, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error('Failed to fetch comics by type');
  return res.json();
}

export async function fetchColoredComics(page: number = 1) {
  const res = await fetch(`${API_BASE_URL}/komikberwarna/${page}`, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error('Failed to fetch colored comics');
  return res.json();
}
