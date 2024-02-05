import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import 'dotenv/config';

const connectionString = process.env.DATABASE_URL;

const client = postgres(connectionString, {prepare: false});
const db = drizzle(client);

await migrate(db, {migrationsFolder: "./scripts/drizzle"});

await client.end();
