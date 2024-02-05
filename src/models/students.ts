import {pgTable, varchar, integer, customType, text} from "drizzle-orm/pg-core";

enum clubs {
    "cold",
    "gdsc",
    "loop",
    "volt",
    "derobotica"
};

type _clubs = Array<clubs>;

const clubsEnum = customType<{data: clubs}>({
    dataType() {
        return 'clubs';
    },
});

export const students = pgTable('students', {
    enrollmentNumber: varchar('enrollment_number', { length: 9 }).primaryKey(),
    firstName: varchar('first_name').notNull(),
    lastName: varchar('last_name'),
    credits: integer('credits').default(0),
    cisId: varchar('cis_id'),
    password: varchar('password'),
    inClubTeam: text('in_club_as_team').array(),
    inClubMember: text('in_club_as_member').array()
});

