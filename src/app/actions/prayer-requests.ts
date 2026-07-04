'use server';

import { prisma } from '@/lib/prisma';

export type PrayerRequestState = { ok: true } | { ok: false; error: string } | undefined;

export async function submitPrayerRequest(
  _prevState: PrayerRequestState,
  formData: FormData
): Promise<PrayerRequestState> {
  // Honeypot: real users never fill this hidden field, bots often do.
  if (formData.get('company')) {
    return { ok: true };
  }

  const message = formData.get('message')?.toString().trim() ?? '';
  if (message.length < 5) {
    return { ok: false, error: 'Please share a little more detail in your prayer request.' };
  }

  const isAnonymous = formData.get('mode') !== 'named';
  const wantsContact = !isAnonymous && formData.get('wantsContact') === 'on';

  try {
    await prisma.prayerRequest.create({
      data: {
        message,
        isAnonymous,
        name: isAnonymous ? null : formData.get('name')?.toString().trim() || null,
        wantsContact,
        contactEmail: wantsContact ? formData.get('contactEmail')?.toString().trim() || null : null,
        contactPhone: wantsContact ? formData.get('contactPhone')?.toString().trim() || null : null,
      },
    });
  } catch {
    return { ok: false, error: 'Something went wrong submitting your request. Please try again.' };
  }

  return { ok: true };
}
