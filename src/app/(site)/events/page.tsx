import PageHero from '@/components/page-hero';
import ComingSoon from '@/components/coming-soon';

export default function EventsPage() {
  return (
    <>
      <PageHero
        kicker="What's Happening"
        title="Events"
        description="See what's coming up and find ways to get involved."
      />
      <ComingSoon message="Our full events calendar is being finalized — check back soon for upcoming dates." />
    </>
  );
}
