import PageHero from '@/components/page-hero';
import ComingSoon from '@/components/coming-soon';

export default function GalleryPage() {
  return (
    <>
      <PageHero
        kicker="Moments"
        title="Gallery"
        description="Photos from our services, events, and community life."
      />
      <ComingSoon message="Our photo gallery is being put together — check back soon for pictures." />
    </>
  );
}
