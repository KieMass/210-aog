import { createAlbum } from '@/app/actions/gallery';
import AdminPageHeader from '@/components/admin-page-header';
import AlbumForm from '@/components/forms/album-form';

export default function NewAlbumPage() {
  return (
    <div>
      <AdminPageHeader title="New Album" />
      <AlbumForm action={createAlbum} />
    </div>
  );
}
