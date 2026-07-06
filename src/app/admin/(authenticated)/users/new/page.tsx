import { requireRole } from '@/lib/dal';
import { createUser } from '@/app/actions/users';
import AdminPageHeader from '@/components/admin-page-header';
import UserForm from '@/components/forms/user-form';

export default async function NewUserPage() {
  await requireRole('SUPER_ADMIN');

  return (
    <div>
      <AdminPageHeader title="New User" />
      <UserForm action={createUser} />
    </div>
  );
}
