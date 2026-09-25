import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

export default prisma;

// Handle connection errors
prisma.$connect()
  .then(() => {
    console.log('Database connected successfully');
  })
  .catch((error) => {
    console.error('Failed to connect to database:', error);
    // Don't exit in development if database is not available
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
  });

// Graceful shutdown
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});
