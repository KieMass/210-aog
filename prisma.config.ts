// Prisma configuration for Prisma 7+
import { config } from 'dotenv';

config();

export default {
  datasource: {
    url: process.env.DATABASE_URL || 'mysql://placeholder:placeholder@localhost:3306/placeholder',
  },
};
