import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { deleteStaffMember } from '@/app/actions/staff';
import AdminPageHeader from '@/components/admin-page-header';
import DeleteButton from '@/components/delete-button';

export default async function AdminStaffPage() {
  const staff = await prisma.staffMember.findMany({ orderBy: { sortOrder: 'asc' } });

  return (
    <div>
      <AdminPageHeader title="Staff" newHref="/admin/staff/new" />

      {staff.length === 0 ? (
        <p className="text-gray-500">No staff members yet.</p>
      ) : (
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Order</th>
                <th className="px-6 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {staff.map((member) => (
                <tr key={member.id}>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{member.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{member.title}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{member.sortOrder}</td>
                  <td className="px-6 py-4 text-right text-sm">
                    <div className="flex justify-end gap-4">
                      <Link href={`/admin/staff/${member.id}`} className="font-medium text-blue-600 hover:text-blue-800">
                        Edit
                      </Link>
                      <form action={deleteStaffMember.bind(null, member.id)}>
                        <DeleteButton />
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
