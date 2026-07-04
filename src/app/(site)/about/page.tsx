import PageHero from '@/components/page-hero';
import ComingSoon from '@/components/coming-soon';

export default function AboutPage() {
  return (
    <>
      <PageHero
        kicker="Our Story"
        title="About 210 CGA"
        description="Learn about our mission, our staff, and what we believe."
      />
      <ComingSoon message="Our full story, leadership team, and beliefs will be posted here soon." />
    </>
  );
}
