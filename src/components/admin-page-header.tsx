import Link from 'next/link';

export default function AdminPageHeader({
  title,
  newHref,
  newLabel,
}: {
  title: string;
  newHref?: string;
  newLabel?: string;
}) {
  return (
    <div className="mb-6 flex items-center justify-between">
      <h1 className="text-2xl font-bold">{title}</h1>
      {newHref && (
        <Link
          href={newHref}
          className="rounded bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-700"
        >
          {newLabel ?? '+ Add New'}
        </Link>
      )}
    </div>
  );
}
