import {pgTable, varchar, integer, customType, text, pgEnum} from "drizzle-orm/pg-core";

export const clubsEnum = pgEnum('clubs_enum', ['cold', 'loop', 'gdsc', 'volt']);

export const students = pgTable('students', {
    enrollmentNumber: varchar('enrollment_number', { length: 9 }).primaryKey(),
    firstName: varchar('first_name').notNull(),
    lastName: varchar('last_name'),
    credits: integer('credits').default(0),
    cisId: varchar('cis_id'),
    password: varchar('password'),
    inClubTeam: clubsEnum('in_club_as_team').array(),
    inClubMember: clubsEnum('in_club_as_member').array()
});

