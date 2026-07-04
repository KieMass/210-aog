import { createStaffMember } from '@/app/actions/staff';
import AdminPageHeader from '@/components/admin-page-header';
import StaffForm from '@/components/forms/staff-form';

export default function NewStaffPage() {
  return (
    <div>
      <AdminPageHeader title="New Staff Member" />
      <StaffForm action={createStaffMember} />
    </div>
  );
}
