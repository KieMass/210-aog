import type { StaffMember } from '@prisma/client';

export default function StaffForm({
  action,
  staffMember,
}: {
  action: (formData: FormData) => void;
  staffMember?: StaffMember;
}) {
  return (
    <form action={action} className="space-y-5 rounded-lg bg-white p-6 shadow">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            defaultValue={staffMember?.name}
            className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
          />
        </div>
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            defaultValue={staffMember?.title}
            className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
          />
        </div>
      </div>

      <div>
        <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
          Bio (optional)
        </label>
        <textarea
          id="bio"
          name="bio"
          rows={4}
          defaultValue={staffMember?.bio ?? ''}
          className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
        />
      </div>

      <div>
        <label htmlFor="photo" className="block text-sm font-medium text-gray-700">
          Photo URL (optional)
        </label>
        <input
          id="photo"
          name="photo"
          type="url"
          defaultValue={staffMember?.photo ?? ''}
          className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
        />
      </div>

      <div>
        <label htmlFor="sortOrder" className="block text-sm font-medium text-gray-700">
          Sort Order (lower shows first)
        </label>
        <input
          id="sortOrder"
          name="sortOrder"
          type="number"
          defaultValue={staffMember?.sortOrder ?? 0}
          className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
        />
      </div>

      <button
        type="submit"
        className="rounded bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-gray-700"
      >
        {staffMember ? 'Save Changes' : 'Add Staff Member'}
      </button>
    </form>
  );
}
