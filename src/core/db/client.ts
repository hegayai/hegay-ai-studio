// src/core/db/client.ts

import { PrismaClient } from "prisma/prisma-client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

// Create a PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Create the Prisma adapter
const adapter = new PrismaPg(pool);

// Create the Prisma client using the adapter
export const prisma = new PrismaClient({
  adapter,
});
