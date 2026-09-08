import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const connectionString = process.env.DATABASE_URL!;
const client = postgres(connectionString, {
  ssl: { rejectUnauthorized: false },
  prepare: false,
  connect_timeout: 10,
  idle_timeout: 20,
  max: 1,
});
export const db = drizzle(client);
