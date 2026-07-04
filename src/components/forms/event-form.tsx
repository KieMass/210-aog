import type { Event } from '@prisma/client';

function toLocalInput(date: Date | null | undefined) {
  if (!date) return '';
  const offset = date.getTimezoneOffset();
  return new Date(date.getTime() - offset * 60000).toISOString().slice(0, 16);
}

export default function EventForm({
  action,
  event,
}: {
  action: (formData: FormData) => void;
  event?: Event;
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
          defaultValue={event?.title}
          className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="startAt" className="block text-sm font-medium text-gray-700">
            Starts At
          </label>
          <input
            id="startAt"
            name="startAt"
            type="datetime-local"
            required
            defaultValue={toLocalInput(event?.startAt)}
            className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
          />
        </div>
        <div>
          <label htmlFor="endAt" className="block text-sm font-medium text-gray-700">
            Ends At (optional)
          </label>
          <input
            id="endAt"
            name="endAt"
            type="datetime-local"
            defaultValue={toLocalInput(event?.endAt)}
            className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
          />
        </div>
      </div>

      <div>
        <label htmlFor="location" className="block text-sm font-medium text-gray-700">
          Location (optional)
        </label>
        <input
          id="location"
          name="location"
          type="text"
          defaultValue={event?.location ?? ''}
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
          defaultValue={event?.description ?? ''}
          className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
        />
      </div>

      <div>
        <label htmlFor="image" className="block text-sm font-medium text-gray-700">
          Image URL (optional)
        </label>
        <input
          id="image"
          name="image"
          type="url"
          defaultValue={event?.image ?? ''}
          className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
        />
      </div>

      <label className="flex items-center gap-2 text-sm text-gray-700">
        <input
          type="checkbox"
          name="recurring"
          defaultChecked={event?.recurring}
          className="h-4 w-4"
        />
        This is a recurring event
      </label>

      <div>
        <label htmlFor="recurrenceRule" className="block text-sm font-medium text-gray-700">
          Recurrence Rule (optional, e.g. &quot;WEEKLY;BYDAY=SU&quot;)
        </label>
        <input
          id="recurrenceRule"
          name="recurrenceRule"
          type="text"
          defaultValue={event?.recurrenceRule ?? ''}
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
          defaultValue={event?.status ?? 'PUBLISHED'}
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
        {event ? 'Save Changes' : 'Create Event'}
      </button>
    </form>
  );
}
