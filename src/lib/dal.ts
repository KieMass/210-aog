import 'server-only';
import { cache } from 'react';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { Role } from '@prisma/client';
import { authOptions } from '@/lib/auth';

export const verifySession = cache(async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect('/admin/login');
  }

  return session;
});

export async function requireRole(...allowed: Role[]) {
  const session = await verifySession();
  const role = session.user?.role;

  if (!role || !allowed.includes(role)) {
    redirect('/admin');
  }

  return session;
}
