import PageHero from '@/components/page-hero';
import PrayerRequestForm from '@/components/prayer-request-form';

export default function PrayerRequestsPage() {
  return (
    <>
      <PageHero
        kicker="We're Here for You"
        title="Submit a Prayer Request"
        description="Whatever you're facing, you don't have to carry it alone. Share your request below — anonymously or with your name."
      />
      <section className="py-20">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <PrayerRequestForm />
        </div>
      </section>
    </>
  );
}
