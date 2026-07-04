import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { updateStaffMember } from '@/app/actions/staff';
import AdminPageHeader from '@/components/admin-page-header';
import StaffForm from '@/components/forms/staff-form';

export default async function EditStaffPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const staffMember = await prisma.staffMember.findUnique({ where: { id } });

  if (!staffMember) {
    notFound();
  }

  return (
    <div>
      <AdminPageHeader title="Edit Staff Member" />
      <StaffForm action={updateStaffMember.bind(null, id)} staffMember={staffMember} />
    </div>
  );
}
