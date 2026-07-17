'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import bcrypt from 'bcryptjs';
import { Prisma, Role } from '@prisma/client';
import { requireRole } from '@/lib/dal';
import { prisma } from '@/lib/prisma';
import { safeDelete } from '@/lib/safe-delete';

export type UserFormState = { ok: true } | { ok: false; error: string } | undefined;

const VALID_ROLES = Object.values(Role);

function isValidRole(value: string): value is Role {
  return (VALID_ROLES as string[]).includes(value);
}

export async function createUser(_prevState: UserFormState, formData: FormData): Promise<UserFormState> {
  await requireRole('SUPER_ADMIN');

  const name = formData.get('name')?.toString().trim() ?? '';
  const email = formData.get('email')?.toString().trim().toLowerCase() ?? '';
  const role = formData.get('role')?.toString() ?? '';
  const password = formData.get('password')?.toString() ?? '';

  if (!name || !email) {
    return { ok: false, error: 'Name and email are required.' };
  }
  if (!isValidRole(role)) {
    return { ok: false, error: 'Please choose a valid role.' };
  }
  if (password.length < 8) {
    return { ok: false, error: 'Password must be at least 8 characters.' };
  }

  const passwordHash = await bcrypt.hash(password, 10);

  try {
    await prisma.user.create({
      data: { name, email, role, passwordHash },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      return { ok: false, error: 'A user with that email already exists.' };
    }
    return { ok: false, error: 'Something went wrong creating the user.' };
  }

  revalidatePath('/admin/users');
  redirect('/admin/users');
}

export async function updateUser(
  id: string,
  _prevState: UserFormState,
  formData: FormData
): Promise<UserFormState> {
  await requireRole('SUPER_ADMIN');

  const name = formData.get('name')?.toString().trim() ?? '';
  const email = formData.get('email')?.toString().trim().toLowerCase() ?? '';
  const role = formData.get('role')?.toString() ?? '';
  const password = formData.get('password')?.toString() ?? '';

  if (!name || !email) {
    return { ok: false, error: 'Name and email are required.' };
  }
  if (!isValidRole(role)) {
    return { ok: false, error: 'Please choose a valid role.' };
  }
  if (password && password.length < 8) {
    return { ok: false, error: 'Password must be at least 8 characters.' };
  }

  if (role !== 'SUPER_ADMIN') {
    const existing = await prisma.user.findUnique({ where: { id } });
    if (existing?.role === 'SUPER_ADMIN') {
      const superAdminCount = await prisma.user.count({ where: { role: 'SUPER_ADMIN' } });
      if (superAdminCount <= 1) {
        return { ok: false, error: 'Cannot change the role of the last remaining Super Admin.' };
      }
    }
  }

  try {
    await prisma.user.update({
      where: { id },
      data: {
        name,
        email,
        role,
        ...(password ? { passwordHash: await bcrypt.hash(password, 10) } : {}),
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      return { ok: false, error: 'A user with that email already exists.' };
    }
    return { ok: false, error: 'Something went wrong updating the user.' };
  }

  revalidatePath('/admin/users');
  redirect('/admin/users');
}

export async function deleteUser(id: string) {
  'use server';
  const session = await requireRole('SUPER_ADMIN');

  if (session.user?.id === id) {
    return;
  }

  const target = await prisma.user.findUnique({ where: { id } });
  if (target?.role === 'SUPER_ADMIN') {
    const superAdminCount = await prisma.user.count({ where: { role: 'SUPER_ADMIN' } });
    if (superAdminCount <= 1) {
      return;
    }
  }

  await safeDelete(() => prisma.user.delete({ where: { id } }));
  revalidatePath('/admin/users');
}
