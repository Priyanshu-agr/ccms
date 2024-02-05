import {pgTable, serial, varchar, boolean, primaryKey} from "drizzle-orm/pg-core";
import { events } from "./events";
import { students } from "./students";

export const attendance = pgTable('attendance', {
    eventId: serial('event_id').notNull().references(() => events.id),
    enrollmentNumber: varchar('enrollment_number').notNull().references(() => students.enrollmentNumber),
    checkedIn: boolean('checked_in')
}, (table) => {
    return {
        pk: primaryKey({ columns: [table.eventId, table.enrollmentNumber] }),
    }
});