import path from 'path';
import { config } from 'dotenv';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

// Load environment variables first
config({ path: path.resolve(import.meta.dirname, '../.env') });

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...\n');

  // Check if admin already exists
  const existingAdmin = await prisma.user.findFirst({
    where: { role: 'SUPER_ADMIN' },
  });

  if (existingAdmin) {
    console.log('✅ Super Admin already exists. Skipping seeding.');
    return;
  }

  // Get email and password from env vars, or generate
  const email = process.env.SEED_ADMIN_EMAIL || 'admin@aog.local';
  let password = process.env.SEED_ADMIN_PASSWORD;
  let isRandomPassword = false;

  if (!password) {
    password = crypto.randomBytes(12).toString('hex');
    isRandomPassword = true;
  }

  // Hash password
  const passwordHash = await bcrypt.hash(password, 10);

  // Create super admin
  const admin = await prisma.user.create({
    data: {
      name: 'Super Admin',
      email,
      passwordHash,
      role: 'SUPER_ADMIN',
    },
  });

  console.log('✅ Super Admin user created successfully!\n');
  console.log('📧 Email:', admin.email);

  if (isRandomPassword) {
    console.log('🔐 Generated Password:', password);
    console.log('\n⚠️  IMPORTANT: Save this password somewhere safe!');
    console.log('   This password will not be shown again.\n');
  } else {
    console.log('🔐 Password: (from SEED_ADMIN_PASSWORD env var)\n');
  }
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
