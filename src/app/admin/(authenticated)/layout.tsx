import { verifySession } from '@/lib/dal';
import AdminNav from '@/components/admin-nav';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await verifySession();

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNav session={session} />
      <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
    </div>
  );
}
