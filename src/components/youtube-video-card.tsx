'use client';

import { useState } from 'react';
import Image from 'next/image';
import { CirclePlay } from 'lucide-react';

export type SermonVideo = {
  videoId: string;
  title: string;
  date: string;
  thumbnail: string;
};

export default function YoutubeVideoCard({ video }: { video: SermonVideo }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="group overflow-hidden rounded-2xl border border-brand-100 bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="relative aspect-video w-full bg-brand-950">
        {playing ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Play ${video.title}`}
            className="absolute inset-0 h-full w-full"
          >
            <Image
              src={video.thumbnail}
              alt={video.title}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            />
            <span className="absolute inset-0 flex items-center justify-center bg-black/25 transition-colors group-hover:bg-black/35">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-brand-950 transition-transform group-hover:scale-110">
                <CirclePlay className="h-7 w-7" />
              </span>
            </span>
          </button>
        )}
      </div>
      <div className="p-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-accent-600">{video.date}</p>
        <h3 className="mt-2 text-lg font-bold text-brand-950">{video.title}</h3>
      </div>
    </div>
  );
}
