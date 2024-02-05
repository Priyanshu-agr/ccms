import 'dotenv/config';
import type { Config } from 'drizzle-kit';

export default {
    schema: "./src/models/*",
    out: './scripts/drizzle',
    driver: 'pg',
    dbCredentials: {
        connectionString: process.env.DATABASE_URL,
    },
    verbose: true,

} satisfies Config;