import type { GalleryAlbum } from '@prisma/client';

export default function AlbumForm({
  action,
  album,
}: {
  action: (formData: FormData) => void;
  album?: GalleryAlbum;
}) {
  return (
    <form action={action} className="space-y-5 rounded-lg bg-white p-6 shadow">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Album Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          defaultValue={album?.title}
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
          rows={3}
          defaultValue={album?.description ?? ''}
          className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
        />
      </div>

      <div>
        <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700">
          Cover Image URL (optional)
        </label>
        <input
          id="coverImage"
          name="coverImage"
          type="url"
          defaultValue={album?.coverImage ?? ''}
          className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
        />
      </div>

      <button
        type="submit"
        className="rounded bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-gray-700"
      >
        {album ? 'Save Changes' : 'Create Album'}
      </button>
    </form>
  );
}
