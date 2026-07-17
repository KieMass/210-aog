'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { verifySession, requireRole } from '@/lib/dal';
import { prisma } from '@/lib/prisma';
import { slugify } from '@/lib/slug';
import { safeDelete } from '@/lib/safe-delete';
import { ContentStatus } from '@prisma/client';

function readPageForm(formData: FormData) {
  return {
    title: formData.get('title')?.toString().trim() ?? '',
    content: formData.get('content')?.toString().trim() ?? '',
    status: (formData.get('status')?.toString() as ContentStatus) || ContentStatus.PUBLISHED,
  };
}

export async function createPage(formData: FormData) {
  const session = await verifySession();
  const data = readPageForm(formData);

  await prisma.page.create({
    data: { ...data, slug: slugify(data.title), authorId: session.user!.id },
  });

  revalidatePath('/admin/pages');
  redirect('/admin/pages');
}

export async function updatePage(id: string, formData: FormData) {
  await verifySession();
  const data = readPageForm(formData);

  const page = await prisma.page.update({
    where: { id },
    data: { ...data, slug: slugify(data.title) },
  });

  revalidatePath('/admin/pages');
  revalidatePath(`/p/${page.slug}`);
  redirect('/admin/pages');
}

export async function deletePage(id: string) {
  'use server';
  await requireRole('SUPER_ADMIN', 'EDITOR');
  await safeDelete(() => prisma.page.delete({ where: { id } }));

  revalidatePath('/admin/pages');
}
