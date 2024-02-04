create type clubs_enum as enum ('cold','gdsc','loop','volt','derobotica');

CREATE TABLE "students" (
  "enrollment_number" varchar(9) PRIMARY KEY,
  "first_name" text,
  "last_name" text,
  "credit" int,
  "cis_id" varchar,
  "password" varchar,
  "in_clubteam" clubs_enum,
  "in_clubmember" clubs_enum
);

create type club_roles_enum as enum ('President','Vice President','Treasurer','Secretary','Executive','Member');

CREATE TABLE "cold" (
  "role" club_roles_enum,
  "enrollment_number" varchar(9) PRIMARY KEY,
  "club_credit" int
);

CREATE TABLE "loop" (
  "role" club_roles_enum,
  "enrollment_number" varchar(9) PRIMARY KEY,
  "club_credit" int
);

CREATE TABLE "gdsc" (
  "role" club_roles_enum,
  "enrollment_number" varchar(9) PRIMARY KEY,
  "club_credit" int
);

CREATE TABLE "volt" (
  "role" club_roles_enum,
  "enrollment_number" varchar(9) PRIMARY KEY,
  "club_credit" int
);

CREATE TABLE "derobotica" (
  "role" club_roles_enum,
  "enrollment_number" varchar(9) PRIMARY KEY,
  "club_credit" int
);

CREATE TABLE "clubs" (
  "club_id" int PRIMARY KEY,
  "club_name" varchar,
  "table_name" varchar,
  "is_technical" bool,
  "club_mentor" varchar,
  "club_president" varchar(9),
  "club_vicepresident" varchar(9),
  "club_treasurer" varchar(9),
  "club_secretary" varchar(9),
  "event_count" int
);

CREATE TABLE "events" (
  "event_id" int PRIMARY KEY,
  "club_id" int,
  "event_title" varchar,
  "event_description" text,
  "event_date" date,
  "event_time" time,
  "event_location" varchar,
  "created_on" timestamp,
  "last_modified_on" timestamp
);

CREATE TABLE "attendance" (
  "event_id" int,
  "enrollment_number" varchar,
  "checked_in" bool,
  PRIMARY KEY ("event_id", "enrollment_number")
);

CREATE TABLE "faculties" (
  "faculty_id" varchar PRIMARY KEY,
  "faculty_name" varchar
);

ALTER TABLE "students" ADD FOREIGN KEY ("enrollment_number") REFERENCES "cold" ("enrollment_number");

ALTER TABLE "students" ADD FOREIGN KEY ("enrollment_number") REFERENCES "derobotica" ("enrollment_number");

ALTER TABLE "students" ADD FOREIGN KEY ("enrollment_number") REFERENCES "gdsc" ("enrollment_number");

ALTER TABLE "students" ADD FOREIGN KEY ("enrollment_number") REFERENCES "volt" ("enrollment_number");

ALTER TABLE "students" ADD FOREIGN KEY ("enrollment_number") REFERENCES "loop" ("enrollment_number");

ALTER TABLE "attendance" ADD FOREIGN KEY ("enrollment_number") REFERENCES "students" ("enrollment_number");

ALTER TABLE "attendance" ADD FOREIGN KEY ("event_id") REFERENCES "events" ("event_id");

alter table "clubs" add foreign key ("club_president") references "students" ("enrollment_number");

alter table "clubs" add foreign key ("club_vicepresident") references "students" ("enrollment_number");

alter table "clubs" add foreign key ("club_treasurer") references "students" ("enrollment_number");

alter table "clubs" add foreign key ("club_secretary") references "students" ("enrollment_number");

ALTER TABLE "clubs" ADD FOREIGN KEY ("club_mentor") REFERENCES "faculties" ("faculty_id");

ALTER TABLE "events" ADD FOREIGN KEY ("club_id") REFERENCES "clubs" ("club_id");