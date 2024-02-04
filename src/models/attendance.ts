import {pgTable, serial, varchar, boolean} from "drizzle-orm/pg-core";
import { events } from "./events";
import { students } from "./students";

export const attendance = pgTable('attendance', {
    eventId: serial('event_id').references(() => events.id),
    enrollmentNumber: varchar('enrollment_number').references(() => students.enrollmentNumber),
    checkedIn: boolean('checked_in')
});