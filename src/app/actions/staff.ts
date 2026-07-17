'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { verifySession, requireRole } from '@/lib/dal';
import { prisma } from '@/lib/prisma';
import { safeDelete } from '@/lib/safe-delete';

function readStaffForm(formData: FormData) {
  return {
    name: formData.get('name')?.toString().trim() ?? '',
    title: formData.get('title')?.toString().trim() ?? '',
    bio: formData.get('bio')?.toString().trim() || null,
    photo: formData.get('photo')?.toString().trim() || null,
    sortOrder: Number(formData.get('sortOrder') ?? 0) || 0,
  };
}

export async function createStaffMember(formData: FormData) {
  await verifySession();
  const data = readStaffForm(formData);

  await prisma.staffMember.create({ data });

  revalidatePath('/admin/staff');
  revalidatePath('/about');
  redirect('/admin/staff');
}

export async function updateStaffMember(id: string, formData: FormData) {
  await verifySession();
  const data = readStaffForm(formData);

  await prisma.staffMember.update({ where: { id }, data });

  revalidatePath('/admin/staff');
  revalidatePath('/about');
  redirect('/admin/staff');
}

export async function deleteStaffMember(id: string) {
  'use server';
  await requireRole('SUPER_ADMIN', 'EDITOR');
  await safeDelete(() => prisma.staffMember.delete({ where: { id } }));

  revalidatePath('/admin/staff');
  revalidatePath('/about');
}
