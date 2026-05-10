'use strict';

require('../../load-env');

const { PrismaClient } = require('@prisma/client');

/** @type {PrismaClient | undefined} */
const globalForPrisma = global;

/**
 * Single PrismaClient instance (dev hot-reload safe for Node servers).
 * Neon: prefer `DATABASE_URL` pointing at the pooled endpoint (with sslmode=require).
 */
const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === 'development'
        ? ['query', 'warn', 'error']
        : ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

module.exports = { prisma };
