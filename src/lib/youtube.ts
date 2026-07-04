import type { Sermon } from '@prisma/client';
import type { SermonVideo } from '@/components/youtube-video-card';

export function extractYoutubeId(url: string): string | null {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|live\/))([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : null;
}

export function sermonToVideo(sermon: Sermon): SermonVideo | null {
  const videoId = extractYoutubeId(sermon.youtubeUrl);
  if (!videoId) return null;

  return {
    videoId,
    title: sermon.title,
    date: sermon.date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    thumbnail: sermon.thumbnail || `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
  };
}
