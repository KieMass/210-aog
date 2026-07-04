export default function PageHero({ kicker, title, description }: {
  kicker: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-950 via-brand-700 to-brand-900 py-20">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'radial-gradient(circle at 15% 30%, rgba(255,255,255,0.15), transparent 40%), radial-gradient(circle at 85% 60%, rgba(255,255,255,0.12), transparent 45%)',
        }}
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-widest text-accent-400">{kicker}</p>
        <h1 className="mt-3 text-4xl font-bold text-white sm:text-5xl">{title}</h1>
        {description && <p className="mt-4 max-w-2xl text-lg text-white/80">{description}</p>}
      </div>
    </section>
  );
}
