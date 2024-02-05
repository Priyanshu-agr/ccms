import {pgTable, serial, varchar, integer} from "drizzle-orm/pg-core";

export const faculties = pgTable('faculties', {
    id: serial('faculty_id').primaryKey(),
    name: varchar('faculty_name').notNull()
});