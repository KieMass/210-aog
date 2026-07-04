import type { Announcement } from '@prisma/client';

function toLocalInput(date: Date | null | undefined) {
  if (!date) return '';
  const offset = date.getTimezoneOffset();
  return new Date(date.getTime() - offset * 60000).toISOString().slice(0, 16);
}

export default function AnnouncementForm({
  action,
  announcement,
}: {
  action: (formData: FormData) => void;
  announcement?: Announcement;
}) {
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
          defaultValue={announcement?.title}
          className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
        />
      </div>

      <div>
        <label htmlFor="body" className="block text-sm font-medium text-gray-700">
          Message
        </label>
        <textarea
          id="body"
          name="body"
          rows={4}
          required
          defaultValue={announcement?.body}
          className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="publishAt" className="block text-sm font-medium text-gray-700">
            Publish At
          </label>
          <input
            id="publishAt"
            name="publishAt"
            type="datetime-local"
            defaultValue={toLocalInput(announcement?.publishAt) || toLocalInput(new Date())}
            className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
          />
        </div>
        <div>
          <label htmlFor="expireAt" className="block text-sm font-medium text-gray-700">
            Expires At (optional)
          </label>
          <input
            id="expireAt"
            name="expireAt"
            type="datetime-local"
            defaultValue={toLocalInput(announcement?.expireAt)}
            className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
          />
        </div>
      </div>

      <div>
        <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
          Priority (higher shows first)
        </label>
        <input
          id="priority"
          name="priority"
          type="number"
          defaultValue={announcement?.priority ?? 0}
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
          defaultValue={announcement?.status ?? 'PUBLISHED'}
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
        {announcement ? 'Save Changes' : 'Create Announcement'}
      </button>
    </form>
  );
}
