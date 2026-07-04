import { createMinistry } from '@/app/actions/ministries';
import AdminPageHeader from '@/components/admin-page-header';
import MinistryForm from '@/components/forms/ministry-form';

export default function NewMinistryPage() {
  return (
    <div>
      <AdminPageHeader title="New Ministry" />
      <MinistryForm action={createMinistry} />
    </div>
  );
}
