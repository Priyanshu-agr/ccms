DO $$ BEGIN
 CREATE TYPE "club_roles" AS ENUM('president', 'vice_president', 'secretary', 'treasurer', 'member', 'executive');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "clubs_enum" AS ENUM('cold', 'loop', 'gdsc', 'volt');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "attendance" (
	"event_id" serial NOT NULL,
	"enrollment_number" varchar NOT NULL,
	"checked_in" boolean,
	CONSTRAINT "attendance_event_id_enrollment_number_pk" PRIMARY KEY("event_id","enrollment_number")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "clubs" (
	"club_id" serial PRIMARY KEY NOT NULL,
	"club_name" varchar NOT NULL,
	"club_description" text,
	"table_name" varchar NOT NULL,
	"is_technical" boolean NOT NULL,
	"club_mentor" serial NOT NULL,
	"club_president" varchar(9),
	"club_vice_president" varchar(9),
	"club_secretary" varchar(9),
	"club_treasurer" varchar(9),
	"event_count" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "cold" (
	"enrollment_number" varchar PRIMARY KEY NOT NULL,
	"role" "club_roles",
	"club_credits" integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "events" (
	"event_id" serial PRIMARY KEY NOT NULL,
	"club_id" serial NOT NULL,
	"event_title" varchar NOT NULL,
	"event_description" text,
	"event_date" date,
	"event_time" time,
	"event_location" varchar,
	"created_on" timestamp,
	"last_modified_on" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "faculties" (
	"faculty_id" serial PRIMARY KEY NOT NULL,
	"faculty_name" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "gdsc" (
	"enrollment_number" varchar PRIMARY KEY NOT NULL,
	"role" "club_roles",
	"club_credits" integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "loop" (
	"enrollment_number" varchar PRIMARY KEY NOT NULL,
	"role" "club_roles",
	"club_credits" integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "students" (
	"enrollment_number" varchar(9) PRIMARY KEY NOT NULL,
	"first_name" varchar NOT NULL,
	"last_name" varchar,
	"credits" integer DEFAULT 0,
	"cis_id" varchar,
	"password" varchar,
	"in_club_as_team" clubs_enum[],
	"in_club_as_member" clubs_enum[]
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "volt" (
	"enrollment_number" varchar PRIMARY KEY NOT NULL,
	"role" "club_roles",
	"club_credits" integer DEFAULT 0
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "attendance" ADD CONSTRAINT "attendance_event_id_events_event_id_fk" FOREIGN KEY ("event_id") REFERENCES "events"("event_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "attendance" ADD CONSTRAINT "attendance_enrollment_number_students_enrollment_number_fk" FOREIGN KEY ("enrollment_number") REFERENCES "students"("enrollment_number") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "clubs" ADD CONSTRAINT "clubs_club_mentor_faculties_faculty_id_fk" FOREIGN KEY ("club_mentor") REFERENCES "faculties"("faculty_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "clubs" ADD CONSTRAINT "clubs_club_president_students_enrollment_number_fk" FOREIGN KEY ("club_president") REFERENCES "students"("enrollment_number") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "clubs" ADD CONSTRAINT "clubs_club_vice_president_students_enrollment_number_fk" FOREIGN KEY ("club_vice_president") REFERENCES "students"("enrollment_number") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "clubs" ADD CONSTRAINT "clubs_club_secretary_students_enrollment_number_fk" FOREIGN KEY ("club_secretary") REFERENCES "students"("enrollment_number") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "clubs" ADD CONSTRAINT "clubs_club_treasurer_students_enrollment_number_fk" FOREIGN KEY ("club_treasurer") REFERENCES "students"("enrollment_number") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "cold" ADD CONSTRAINT "cold_enrollment_number_students_enrollment_number_fk" FOREIGN KEY ("enrollment_number") REFERENCES "students"("enrollment_number") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "events" ADD CONSTRAINT "events_club_id_clubs_club_id_fk" FOREIGN KEY ("club_id") REFERENCES "clubs"("club_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "gdsc" ADD CONSTRAINT "gdsc_enrollment_number_students_enrollment_number_fk" FOREIGN KEY ("enrollment_number") REFERENCES "students"("enrollment_number") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "loop" ADD CONSTRAINT "loop_enrollment_number_students_enrollment_number_fk" FOREIGN KEY ("enrollment_number") REFERENCES "students"("enrollment_number") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "volt" ADD CONSTRAINT "volt_enrollment_number_students_enrollment_number_fk" FOREIGN KEY ("enrollment_number") REFERENCES "students"("enrollment_number") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
