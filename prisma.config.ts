// Prisma configuration for Prisma 7+
// DATABASE_URL should be set via environment variables or .env file
import path from 'path';
import { config } from 'dotenv';

// Load .env file
config({ path: path.resolve(__dirname, '.env') });

// `prisma generate` doesn't need a real connection, only `migrate`/`db`/`studio` do,
// so fall back to a placeholder instead of failing the build when the var isn't
// injected yet (e.g. during some CI/build phases).
const url = process.env.DATABASE_URL;

if (!url) {
  console.warn(
    'DATABASE_URL environment variable is not set. Using a placeholder value, ' +
    'which is only valid for `prisma generate`. Set DATABASE_URL for migrate/db/studio commands.'
  );
}

const prismaConfig = {
  engine: 'classic' as const,
  migrations: {
    seed: 'node ./prisma/seed.js',
  },
  datasource: {
    url: url || 'mysql://placeholder:placeholder@localhost:3306/placeholder',
  },
};

export default prismaConfig;
