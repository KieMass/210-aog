import SiteHeader from '@/components/site-header';
import SiteFooter from '@/components/site-footer';
import AnnouncementBanner from '@/components/announcement-banner';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-full flex-1 flex-col">
      <AnnouncementBanner />
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
