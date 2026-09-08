import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const connectionString = process.env.DATABASE_URL!;
const client = postgres(connectionString, {
  ssl: { rejectUnauthorized: false },
  // Transaction-mode pooler (port 6543) does not support prepared statements.
  prepare: false,
  connect_timeout: 10,
  idle_timeout: 20,
  max: 1,
});
export const db = drizzle(client);
