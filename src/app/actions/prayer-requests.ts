'use server';

import { headers } from 'next/headers';
import { prisma } from '@/lib/prisma';

export type PrayerRequestState = { ok: true } | { ok: false; error: string } | undefined;

const MAX_SUBMISSIONS_PER_WINDOW = 3;
const WINDOW_MS = 60 * 60 * 1000;

async function getClientIp() {
  const headerList = await headers();
  const forwardedFor = headerList.get('x-forwarded-for');
  if (forwardedFor) return forwardedFor.split(',')[0].trim();
  return headerList.get('x-real-ip');
}

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

  const submitterIp = await getClientIp();

  if (submitterIp) {
    const recentCount = await prisma.prayerRequest.count({
      where: {
        submitterIp,
        createdAt: { gte: new Date(Date.now() - WINDOW_MS) },
      },
    });
    if (recentCount >= MAX_SUBMISSIONS_PER_WINDOW) {
      return {
        ok: false,
        error: "You've submitted several requests recently. Please try again a bit later.",
      };
    }
  }

  try {
    await prisma.prayerRequest.create({
      data: {
        message,
        isAnonymous,
        name: isAnonymous ? null : formData.get('name')?.toString().trim() || null,
        wantsContact,
        contactEmail: wantsContact ? formData.get('contactEmail')?.toString().trim() || null : null,
        contactPhone: wantsContact ? formData.get('contactPhone')?.toString().trim() || null : null,
        submitterIp,
      },
    });
  } catch {
    return { ok: false, error: 'Something went wrong submitting your request. Please try again.' };
  }

  return { ok: true };
}
