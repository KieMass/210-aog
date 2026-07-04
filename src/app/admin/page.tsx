import { verifySession } from '@/lib/dal';
import AdminDashboardClient from './dashboard-client';

export default async function AdminDashboard() {
  const session = await verifySession();

  return <AdminDashboardClient session={session} />;
}
