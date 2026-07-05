import SiteHeader from '@/components/site-header';
import SiteFooter from '@/components/site-footer';
import AnnouncementBanner from '@/components/announcement-banner';
import AdminToolbar from '@/components/admin-toolbar';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-full flex-1 flex-col">
      <AdminToolbar />
      <AnnouncementBanner />
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
