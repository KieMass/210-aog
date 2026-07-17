import { Prisma } from '@prisma/client';

// Swallows "record not found" (e.g. double-click, or already deleted by
// another admin) instead of crashing; any other error still propagates.
export async function safeDelete(fn: () => Promise<unknown>) {
  try {
    await fn();
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      return;
    }
    throw error;
  }
}
