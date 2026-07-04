import { createPage } from '@/app/actions/pages';
import AdminPageHeader from '@/components/admin-page-header';
import PageForm from '@/components/forms/page-form';

export default function NewPagePage() {
  return (
    <div>
      <AdminPageHeader title="New Page" />
      <PageForm action={createPage} />
    </div>
  );
}
