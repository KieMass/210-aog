'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { verifySession } from '@/lib/dal';
import { prisma } from '@/lib/prisma';
import { safeDelete } from '@/lib/safe-delete';
import { ContentStatus } from '@prisma/client';

function readSermonForm(formData: FormData) {
  return {
    title: formData.get('title')?.toString().trim() ?? '',
    speaker: formData.get('speaker')?.toString().trim() ?? '',
    date: new Date(formData.get('date')?.toString() ?? ''),
    scripture: formData.get('scripture')?.toString().trim() || null,
    youtubeUrl: formData.get('youtubeUrl')?.toString().trim() ?? '',
    description: formData.get('description')?.toString().trim() || null,
    thumbnail: formData.get('thumbnail')?.toString().trim() || null,
    status: (formData.get('status')?.toString() as ContentStatus) || ContentStatus.PUBLISHED,
  };
}

export async function createSermon(formData: FormData) {
  const session = await verifySession();
  const data = readSermonForm(formData);

  await prisma.sermon.create({
    data: { ...data, authorId: session.user!.id },
  });

  revalidatePath('/admin/sermons');
  revalidatePath('/sermons');
  revalidatePath('/');
  redirect('/admin/sermons');
}

export async function updateSermon(id: string, formData: FormData) {
  await verifySession();
  const data = readSermonForm(formData);

  await prisma.sermon.update({ where: { id }, data });

  revalidatePath('/admin/sermons');
  revalidatePath('/sermons');
  revalidatePath('/');
  redirect('/admin/sermons');
}

export async function deleteSermon(id: string) {
  'use server';
  await verifySession();
  await safeDelete(() => prisma.sermon.delete({ where: { id } }));

  revalidatePath('/admin/sermons');
  revalidatePath('/sermons');
  revalidatePath('/');
}
