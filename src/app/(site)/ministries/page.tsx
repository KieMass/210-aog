import PageHero from '@/components/page-hero';
import ComingSoon from '@/components/coming-soon';

export default function MinistriesPage() {
  return (
    <>
      <PageHero
        kicker="Get Involved"
        title="Ministries"
        description="Find where you belong and how you can serve."
      />
      <ComingSoon message="Details on each of our ministries are on their way — check back soon." />
    </>
  );
}
