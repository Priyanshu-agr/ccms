import {pgTable, serial, text, varchar, date, time, timestamp} from "drizzle-orm/pg-core";
import { clubs } from "./clubs";

export const events = pgTable('events', {
    id: serial('event_id').primaryKey(),
    clubId: serial('club_id').references(() => clubs.id),
    title: varchar('event_title'),
    description: text('event_description'),
    date: date('event_date'),
    time: time('event_time'),
    location: varchar('event_location'),
    createdOn: timestamp('created_on'),
    lastModified: timestamp('last_modified_on')
});