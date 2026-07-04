'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { verifySession } from '@/lib/dal';
import { prisma } from '@/lib/prisma';
import { ContentStatus } from '@prisma/client';

function readAnnouncementForm(formData: FormData) {
  const publishAtRaw = formData.get('publishAt')?.toString();
  const expireAtRaw = formData.get('expireAt')?.toString();

  return {
    title: formData.get('title')?.toString().trim() ?? '',
    body: formData.get('body')?.toString().trim() ?? '',
    publishAt: publishAtRaw ? new Date(publishAtRaw) : new Date(),
    expireAt: expireAtRaw ? new Date(expireAtRaw) : null,
    priority: Number(formData.get('priority') ?? 0) || 0,
    status: (formData.get('status')?.toString() as ContentStatus) || ContentStatus.PUBLISHED,
  };
}

export async function createAnnouncement(formData: FormData) {
  const session = await verifySession();
  const data = readAnnouncementForm(formData);

  await prisma.announcement.create({
    data: { ...data, authorId: session.user!.id },
  });

  revalidatePath('/admin/announcements');
  revalidatePath('/', 'layout');
  redirect('/admin/announcements');
}

export async function updateAnnouncement(id: string, formData: FormData) {
  await verifySession();
  const data = readAnnouncementForm(formData);

  await prisma.announcement.update({ where: { id }, data });

  revalidatePath('/admin/announcements');
  revalidatePath('/', 'layout');
  redirect('/admin/announcements');
}

export async function deleteAnnouncement(id: string) {
  'use server';
  await verifySession();
  await prisma.announcement.delete({ where: { id } });

  revalidatePath('/admin/announcements');
  revalidatePath('/', 'layout');
}
