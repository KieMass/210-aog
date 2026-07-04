import type { Ministry } from '@prisma/client';

export default function MinistryForm({
  action,
  ministry,
}: {
  action: (formData: FormData) => void;
  ministry?: Ministry;
}) {
  return (
    <form action={action} className="space-y-5 rounded-lg bg-white p-6 shadow">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          defaultValue={ministry?.name}
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
          defaultValue={ministry?.description ?? ''}
          className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="leaderName" className="block text-sm font-medium text-gray-700">
            Leader Name (optional)
          </label>
          <input
            id="leaderName"
            name="leaderName"
            type="text"
            defaultValue={ministry?.leaderName ?? ''}
            className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
          />
        </div>
        <div>
          <label htmlFor="meetingTime" className="block text-sm font-medium text-gray-700">
            Meeting Time (optional)
          </label>
          <input
            id="meetingTime"
            name="meetingTime"
            type="text"
            placeholder="e.g. Sundays after service"
            defaultValue={ministry?.meetingTime ?? ''}
            className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
          />
        </div>
      </div>

      <div>
        <label htmlFor="image" className="block text-sm font-medium text-gray-700">
          Image URL (optional)
        </label>
        <input
          id="image"
          name="image"
          type="url"
          defaultValue={ministry?.image ?? ''}
          className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
        />
      </div>

      <button
        type="submit"
        className="rounded bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-gray-700"
      >
        {ministry ? 'Save Changes' : 'Create Ministry'}
      </button>
    </form>
  );
}
