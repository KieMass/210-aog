'use client';

import { useActionState } from 'react';
import type { User } from '@prisma/client';
import type { UserFormState } from '@/app/actions/users';

export default function UserForm({
  action,
  user,
}: {
  action: (prevState: UserFormState, formData: FormData) => Promise<UserFormState>;
  user?: User;
}) {
  const [state, formAction, pending] = useActionState<UserFormState, FormData>(action, undefined);

  return (
    <form action={formAction} className="space-y-5 rounded-lg bg-white p-6 shadow">
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
            defaultValue={user?.name}
            className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            defaultValue={user?.email}
            className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
          />
        </div>
      </div>

      <div>
        <label htmlFor="role" className="block text-sm font-medium text-gray-700">
          Role
        </label>
        <select
          id="role"
          name="role"
          defaultValue={user?.role ?? 'EDITOR'}
          className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
        >
          <option value="SUPER_ADMIN">Super Admin</option>
          <option value="EDITOR">Editor</option>
          <option value="CONTRIBUTOR">Contributor</option>
        </select>
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          {user ? 'New Password (leave blank to keep current)' : 'Password'}
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required={!user}
          minLength={8}
          className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
        />
      </div>

      {state && !state.ok && (
        <p className="rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-700">{state.error}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="rounded bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-gray-700 disabled:opacity-60"
      >
        {pending ? 'Saving...' : user ? 'Save Changes' : 'Create User'}
      </button>
    </form>
  );
}
