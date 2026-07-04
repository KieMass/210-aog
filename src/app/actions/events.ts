'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { verifySession } from '@/lib/dal';
import { prisma } from '@/lib/prisma';
import { ContentStatus } from '@prisma/client';

function readEventForm(formData: FormData) {
  const endAtRaw = formData.get('endAt')?.toString();

  return {
    title: formData.get('title')?.toString().trim() ?? '',
    description: formData.get('description')?.toString().trim() || null,
    startAt: new Date(formData.get('startAt')?.toString() ?? ''),
    endAt: endAtRaw ? new Date(endAtRaw) : null,
    location: formData.get('location')?.toString().trim() || null,
    recurring: formData.get('recurring') === 'on',
    recurrenceRule: formData.get('recurrenceRule')?.toString().trim() || null,
    image: formData.get('image')?.toString().trim() || null,
    status: (formData.get('status')?.toString() as ContentStatus) || ContentStatus.PUBLISHED,
  };
}

export async function createEvent(formData: FormData) {
  const session = await verifySession();
  const data = readEventForm(formData);

  await prisma.event.create({
    data: { ...data, authorId: session.user!.id },
  });

  revalidatePath('/admin/events');
  revalidatePath('/events');
  redirect('/admin/events');
}

export async function updateEvent(id: string, formData: FormData) {
  await verifySession();
  const data = readEventForm(formData);

  await prisma.event.update({ where: { id }, data });

  revalidatePath('/admin/events');
  revalidatePath('/events');
  redirect('/admin/events');
}

export async function deleteEvent(id: string) {
  'use server';
  await verifySession();
  await prisma.event.delete({ where: { id } });

  revalidatePath('/admin/events');
  revalidatePath('/events');
}
