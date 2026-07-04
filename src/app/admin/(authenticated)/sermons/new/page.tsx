import { createSermon } from '@/app/actions/sermons';
import AdminPageHeader from '@/components/admin-page-header';
import SermonForm from '@/components/forms/sermon-form';

export default function NewSermonPage() {
  return (
    <div>
      <AdminPageHeader title="New Sermon" />
      <SermonForm action={createSermon} />
    </div>
  );
}
