import { createAnnouncement } from '@/app/actions/announcements';
import AdminPageHeader from '@/components/admin-page-header';
import AnnouncementForm from '@/components/forms/announcement-form';

export default function NewAnnouncementPage() {
  return (
    <div>
      <AdminPageHeader title="New Announcement" />
      <AnnouncementForm action={createAnnouncement} />
    </div>
  );
}
