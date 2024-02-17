-- CreateEnum
CREATE TYPE "club_roles" AS ENUM ('president', 'vice_president', 'secretary', 'treasurer', 'member', 'executive');

-- CreateEnum
CREATE TYPE "clubs_enum" AS ENUM ('cold', 'loop', 'gdsc', 'volt');

-- CreateTable
CREATE TABLE "attendance" (
    "event_id" SERIAL NOT NULL,
    "enrollment_number" VARCHAR NOT NULL,
    "checked_in" BOOLEAN,

    CONSTRAINT "attendance_event_id_enrollment_number_pk" PRIMARY KEY ("event_id","enrollment_number")
);

-- CreateTable
CREATE TABLE "clubs" (
    "club_id" SERIAL NOT NULL,
    "club_name" VARCHAR NOT NULL,
    "club_description" TEXT,
    "is_technical" BOOLEAN NOT NULL,
    "club_mentor" SERIAL NOT NULL,
    "club_president" VARCHAR(9),
    "club_vice_president" VARCHAR(9),
    "club_secretary" VARCHAR(9),
    "club_treasurer" VARCHAR(9),
    "event_count" INTEGER,

    CONSTRAINT "clubs_pkey" PRIMARY KEY ("club_id")
);

-- CreateTable
CREATE TABLE "events" (
    "event_id" SERIAL NOT NULL,
    "club_id" SERIAL NOT NULL,
    "event_title" VARCHAR NOT NULL,
    "event_description" TEXT,
    "event_date" DATE,
    "event_time" TIME(6),
    "event_location" VARCHAR,
    "created_on" TIMESTAMP(6),
    "last_modified_on" TIMESTAMP(6),
    "created_by" VARCHAR(9),

    CONSTRAINT "events_pkey" PRIMARY KEY ("event_id")
);

-- CreateTable
CREATE TABLE "faculties" (
    "faculty_id" SERIAL NOT NULL,
    "faculty_name" VARCHAR NOT NULL,

    CONSTRAINT "faculties_pkey" PRIMARY KEY ("faculty_id")
);

-- CreateTable
CREATE TABLE "students" (
    "enrollment_number" VARCHAR(9) NOT NULL,
    "first_name" VARCHAR NOT NULL,
    "last_name" VARCHAR,
    "credits" INTEGER DEFAULT 0,
    "cis_id" VARCHAR,
    "password" VARCHAR,
    "in_club_as_team" "clubs_enum"[],
    "in_club_as_member" "clubs_enum"[],

    CONSTRAINT "students_pkey" PRIMARY KEY ("enrollment_number")
);

-- CreateTable
CREATE TABLE "Membership" (
    "enrollment_number" VARCHAR(9) NOT NULL,
    "club_id" INTEGER NOT NULL,
    "club_credits" INTEGER NOT NULL,
    "club_role" "club_roles" NOT NULL,

    CONSTRAINT "Membership_enrollment_number_club_id_pk" PRIMARY KEY ("enrollment_number","club_id")
);

-- CreateTable
CREATE TABLE "speakers" (
    "speaker_id" SERIAL NOT NULL,
    "speaker_name" VARCHAR NOT NULL,
    "speaker_bio" VARCHAR,

    CONSTRAINT "speakers_pkey" PRIMARY KEY ("speaker_id")
);

-- CreateTable
CREATE TABLE "_EventToSpeaker" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_EventToSpeaker_AB_unique" ON "_EventToSpeaker"("A", "B");

-- CreateIndex
CREATE INDEX "_EventToSpeaker_B_index" ON "_EventToSpeaker"("B");

-- AddForeignKey
ALTER TABLE "attendance" ADD CONSTRAINT "attendance_enrollment_number_students_enrollment_number_fk" FOREIGN KEY ("enrollment_number") REFERENCES "students"("enrollment_number") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "attendance" ADD CONSTRAINT "attendance_event_id_events_event_id_fk" FOREIGN KEY ("event_id") REFERENCES "events"("event_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "clubs" ADD CONSTRAINT "clubs_club_mentor_faculties_faculty_id_fk" FOREIGN KEY ("club_mentor") REFERENCES "faculties"("faculty_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "clubs" ADD CONSTRAINT "clubs_club_president_students_enrollment_number_fk" FOREIGN KEY ("club_president") REFERENCES "students"("enrollment_number") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "clubs" ADD CONSTRAINT "clubs_club_secretary_students_enrollment_number_fk" FOREIGN KEY ("club_secretary") REFERENCES "students"("enrollment_number") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "clubs" ADD CONSTRAINT "clubs_club_treasurer_students_enrollment_number_fk" FOREIGN KEY ("club_treasurer") REFERENCES "students"("enrollment_number") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "clubs" ADD CONSTRAINT "clubs_club_vice_president_students_enrollment_number_fk" FOREIGN KEY ("club_vice_president") REFERENCES "students"("enrollment_number") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_club_id_clubs_club_id_fk" FOREIGN KEY ("club_id") REFERENCES "clubs"("club_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_created_by_students_enrollment_number_fk" FOREIGN KEY ("created_by") REFERENCES "students"("enrollment_number") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Membership" ADD CONSTRAINT "Membership_enrollment_number_students_enrollment_number_fk" FOREIGN KEY ("enrollment_number") REFERENCES "students"("enrollment_number") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Membership" ADD CONSTRAINT "Membership_club_id_clubs_club_id_fk" FOREIGN KEY ("club_id") REFERENCES "clubs"("club_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "_EventToSpeaker" ADD CONSTRAINT "_EventToSpeaker_A_fkey" FOREIGN KEY ("A") REFERENCES "events"("event_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToSpeaker" ADD CONSTRAINT "_EventToSpeaker_B_fkey" FOREIGN KEY ("B") REFERENCES "speakers"("speaker_id") ON DELETE CASCADE ON UPDATE CASCADE;
