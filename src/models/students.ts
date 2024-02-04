import {pgTable, serial, text, varchar, boolean, integer} from "drizzle-orm/pg-core";

enum clubs {
    "cold",
    "gdsc",
    "loop",
    "volt",
    "derobotica"
};

type _clubs = Array<clubs>;

export const students = pgTable('students', {
    enrollmentNumber: varchar('enrollment_number', { length: 9 }).primaryKey(),
    firstName: varchar('first_name'),
    lastName: varchar('last_name'),
    credits: integer('credits'),
    cisId: varchar('cis_id'),
    password: varchar('password'),
    inClubTeam: varchar('in_club_as_team').$type<_clubs>(),
    inClubMember: varchar('in_club_as_member').$type<_clubs>()
});