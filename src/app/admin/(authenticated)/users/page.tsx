import Link from 'next/link';
import { Shield } from 'lucide-react';
import { requireRole } from '@/lib/dal';
import { prisma } from '@/lib/prisma';
import { deleteUser } from '@/app/actions/users';
import AdminPageHeader from '@/components/admin-page-header';
import DeleteButton from '@/components/delete-button';

const ROLE_LABELS: Record<string, string> = {
  SUPER_ADMIN: 'Super Admin',
  EDITOR: 'Editor',
  CONTRIBUTOR: 'Contributor',
};

export default async function AdminUsersPage() {
  const session = await requireRole('SUPER_ADMIN');

  const users = await prisma.user.findMany({ orderBy: { createdAt: 'asc' } });
  const superAdminCount = users.filter((u) => u.role === 'SUPER_ADMIN').length;

  return (
    <div>
      <AdminPageHeader title="Users" newHref="/admin/users/new" newLabel="+ Add User" />

      <div className="overflow-hidden rounded-lg bg-white shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Role</th>
              <th className="px-6 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((user) => {
              const isSelf = user.id === session.user?.id;
              const isLastSuperAdmin = user.role === 'SUPER_ADMIN' && superAdminCount <= 1;
              return (
                <tr key={user.id}>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {user.name}
                    {isSelf && <span className="ml-2 text-xs text-gray-400">(you)</span>}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <span className="inline-flex items-center gap-1.5">
                      {user.role === 'SUPER_ADMIN' && <Shield className="h-3.5 w-3.5 text-amber-500" />}
                      {ROLE_LABELS[user.role] ?? user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right text-sm">
                    <div className="flex justify-end gap-4">
                      <Link href={`/admin/users/${user.id}`} className="font-medium text-blue-600 hover:text-blue-800">
                        Edit
                      </Link>
                      {!isSelf && !isLastSuperAdmin && (
                        <form action={deleteUser.bind(null, user.id)}>
                          <DeleteButton />
                        </form>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
