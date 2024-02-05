import {pgTable, pgEnum, varchar, integer} from "drizzle-orm/pg-core";

export const clubRolesEnum = pgEnum('club_roles', ['president', 'vice_president', 'secretary', 'treasurer', 'member', 'executive']);

export const cold = pgTable('cold', {
    enrollmentNumber: varchar('enrollment_number').primaryKey(),
    role: clubRolesEnum('role'),
    clubCredits: integer('club_credits').default(0),
});