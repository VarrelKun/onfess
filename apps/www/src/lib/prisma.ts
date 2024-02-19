import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

const prisma: PrismaClient =
  (globalThis as any).prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") (globalThis as any).prisma = prisma;
