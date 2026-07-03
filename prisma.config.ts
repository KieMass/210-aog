// Prisma configuration for Prisma 7+
export default {
  datasource: {
    url: process.env.DATABASE_URL || 'mysql://placeholder:placeholder@localhost:3306/placeholder',
  },
};
