'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { verifySession, requireRole } from '@/lib/dal';
import { prisma } from '@/lib/prisma';
import { slugify } from '@/lib/slug';
import { safeDelete } from '@/lib/safe-delete';

function readMinistryForm(formData: FormData) {
  return {
    name: formData.get('name')?.toString().trim() ?? '',
    description: formData.get('description')?.toString().trim() || null,
    leaderName: formData.get('leaderName')?.toString().trim() || null,
    meetingTime: formData.get('meetingTime')?.toString().trim() || null,
    image: formData.get('image')?.toString().trim() || null,
  };
}

export async function createMinistry(formData: FormData) {
  await verifySession();
  const data = readMinistryForm(formData);

  await prisma.ministry.create({
    data: { ...data, slug: slugify(data.name) },
  });

  revalidatePath('/admin/ministries');
  revalidatePath('/ministries');
  revalidatePath('/');
  redirect('/admin/ministries');
}

export async function updateMinistry(id: string, formData: FormData) {
  await verifySession();
  const data = readMinistryForm(formData);

  await prisma.ministry.update({
    where: { id },
    data: { ...data, slug: slugify(data.name) },
  });

  revalidatePath('/admin/ministries');
  revalidatePath('/ministries');
  revalidatePath('/');
  redirect('/admin/ministries');
}

export async function deleteMinistry(id: string) {
  'use server';
  await requireRole('SUPER_ADMIN', 'EDITOR');
  await safeDelete(() => prisma.ministry.delete({ where: { id } }));

  revalidatePath('/admin/ministries');
  revalidatePath('/ministries');
  revalidatePath('/');
}
