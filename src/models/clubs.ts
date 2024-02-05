import {pgTable, serial, text, varchar, boolean, integer} from "drizzle-orm/pg-core";
import { students } from "./students";
import { faculties } from "./faculties";

export const clubs = pgTable('clubs',{
    id: serial('club_id').primaryKey(),
    name: varchar('club_name').notNull(),
    description: text('club_description'),
    tableName: varchar('table_name').notNull(),
    isTechnical: boolean('is_technical').notNull(),
    mentor: serial('club_mentor').references(() => faculties.id),
    president: varchar('club_president').references(() => students.enrollmentNumber),
    vicePresident: varchar('club_vice_president').references(() => students.enrollmentNumber),
    secretary: varchar('club_secretary').references(() => students.enrollmentNumber),
    treasurer: varchar('club_treasurer').references(() => students.enrollmentNumber),
    eventCount: integer('event_count'),
});