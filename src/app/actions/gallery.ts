'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { verifySession, requireRole } from '@/lib/dal';
import { prisma } from '@/lib/prisma';
import { safeDelete } from '@/lib/safe-delete';

export async function createAlbum(formData: FormData) {
  await verifySession();

  const album = await prisma.galleryAlbum.create({
    data: {
      title: formData.get('title')?.toString().trim() ?? '',
      description: formData.get('description')?.toString().trim() || null,
      coverImage: formData.get('coverImage')?.toString().trim() || null,
    },
  });

  revalidatePath('/admin/gallery');
  revalidatePath('/gallery');
  redirect(`/admin/gallery/${album.id}`);
}

export async function updateAlbum(id: string, formData: FormData) {
  await verifySession();

  await prisma.galleryAlbum.update({
    where: { id },
    data: {
      title: formData.get('title')?.toString().trim() ?? '',
      description: formData.get('description')?.toString().trim() || null,
      coverImage: formData.get('coverImage')?.toString().trim() || null,
    },
  });

  revalidatePath('/admin/gallery');
  revalidatePath('/gallery');
  redirect('/admin/gallery');
}

export async function deleteAlbum(id: string) {
  'use server';
  await requireRole('SUPER_ADMIN', 'EDITOR');
  await safeDelete(() => prisma.galleryAlbum.delete({ where: { id } }));

  revalidatePath('/admin/gallery');
  revalidatePath('/gallery');
}

export async function addPhoto(albumId: string, formData: FormData) {
  await verifySession();

  const url = formData.get('url')?.toString().trim();
  if (!url) return;

  await prisma.galleryPhoto.create({
    data: {
      url,
      caption: formData.get('caption')?.toString().trim() || null,
      albumId,
    },
  });

  revalidatePath(`/admin/gallery/${albumId}`);
  revalidatePath('/gallery');
}

export async function deletePhoto(albumId: string, photoId: string) {
  'use server';
  await requireRole('SUPER_ADMIN', 'EDITOR');
  await safeDelete(() => prisma.galleryPhoto.delete({ where: { id: photoId } }));

  revalidatePath(`/admin/gallery/${albumId}`);
  revalidatePath('/gallery');
}
