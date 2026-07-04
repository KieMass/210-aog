import { CirclePlay, ExternalLink } from 'lucide-react';

const CHANNEL_URL = 'https://www.youtube.com/@210christiangospelassembly8';

export default function YoutubeCta() {
  return (
    <a
      href={CHANNEL_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col items-start gap-4 rounded-2xl border border-brand-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="flex items-center gap-4">
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-red-600/10 text-red-600">
          <CirclePlay className="h-7 w-7" />
        </span>
        <div>
          <h3 className="font-bold text-brand-950">Watch Our Sermons</h3>
          <p className="mt-1 text-sm text-brand-400">
            Catch our latest Sunday services and messages on YouTube.
          </p>
        </div>
      </div>
      <span className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-full bg-brand-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors group-hover:bg-brand-700 sm:self-auto">
        Watch on YouTube
        <ExternalLink className="h-4 w-4" />
      </span>
    </a>
  );
}
