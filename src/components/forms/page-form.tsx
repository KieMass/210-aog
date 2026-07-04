import type { Page } from '@prisma/client';

export default function PageForm({
  action,
  page,
}: {
  action: (formData: FormData) => void;
  page?: Page;
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
          defaultValue={page?.title}
          className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
        />
        {page && <p className="mt-1 text-xs text-gray-500">URL: /p/{page.slug}</p>}
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700">
          Content
        </label>
        <textarea
          id="content"
          name="content"
          rows={12}
          required
          defaultValue={page?.content}
          className="mt-1 w-full rounded border border-gray-300 px-3 py-2 font-mono text-sm"
        />
      </div>

      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-700">
          Status
        </label>
        <select
          id="status"
          name="status"
          defaultValue={page?.status ?? 'PUBLISHED'}
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
        {page ? 'Save Changes' : 'Create Page'}
      </button>
    </form>
  );
}
