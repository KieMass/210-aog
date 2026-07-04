import type { Sermon } from '@prisma/client';

export default function SermonForm({
  action,
  sermon,
}: {
  action: (formData: FormData) => void;
  sermon?: Sermon;
}) {
  const dateValue = sermon ? sermon.date.toISOString().slice(0, 10) : '';

  return (
    <form action={action} className="space-y-5 rounded-lg bg-white p-6 shadow">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          defaultValue={sermon?.title}
          className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="speaker" className="block text-sm font-medium text-gray-700">
            Speaker
          </label>
          <input
            id="speaker"
            name="speaker"
            type="text"
            required
            defaultValue={sermon?.speaker}
            className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
          />
        </div>
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">
            Date
          </label>
          <input
            id="date"
            name="date"
            type="date"
            required
            defaultValue={dateValue}
            className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
          />
        </div>
      </div>

      <div>
        <label htmlFor="scripture" className="block text-sm font-medium text-gray-700">
          Scripture Reference (optional)
        </label>
        <input
          id="scripture"
          name="scripture"
          type="text"
          defaultValue={sermon?.scripture ?? ''}
          className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
        />
      </div>

      <div>
        <label htmlFor="youtubeUrl" className="block text-sm font-medium text-gray-700">
          YouTube URL
        </label>
        <input
          id="youtubeUrl"
          name="youtubeUrl"
          type="url"
          required
          placeholder="https://www.youtube.com/watch?v=..."
          defaultValue={sermon?.youtubeUrl}
          className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
        />
      </div>

      <div>
        <label htmlFor="thumbnail" className="block text-sm font-medium text-gray-700">
          Thumbnail URL (optional — defaults to the YouTube thumbnail)
        </label>
        <input
          id="thumbnail"
          name="thumbnail"
          type="url"
          defaultValue={sermon?.thumbnail ?? ''}
          className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description (optional)
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          defaultValue={sermon?.description ?? ''}
          className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
        />
      </div>

      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-700">
          Status
        </label>
        <select
          id="status"
          name="status"
          defaultValue={sermon?.status ?? 'PUBLISHED'}
          className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
        >
          <option value="DRAFT">Draft</option>
          <option value="PUBLISHED">Published</option>
          <option value="ARCHIVED">Archived</option>
        </select>
      </div>

      <button
        type="submit"
        className="rounded bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-gray-700"
      >
        {sermon ? 'Save Changes' : 'Create Sermon'}
      </button>
    </form>
  );
}
