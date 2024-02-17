/*
  Warnings:

  - You are about to drop the `_EventToSpeaker` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_EventToSpeaker" DROP CONSTRAINT "_EventToSpeaker_A_fkey";

-- DropForeignKey
ALTER TABLE "_EventToSpeaker" DROP CONSTRAINT "_EventToSpeaker_B_fkey";

-- DropTable
DROP TABLE "_EventToSpeaker";

-- CreateTable
CREATE TABLE "eventToSpeaker" (
    "event_id" INTEGER NOT NULL,
    "speaker_id" INTEGER NOT NULL,

    CONSTRAINT "eventToSpeaker_event_id_speaker_id_pk" PRIMARY KEY ("event_id","speaker_id")
);

-- AddForeignKey
ALTER TABLE "eventToSpeaker" ADD CONSTRAINT "eventToSpeaker_event_id_events_event_id_fk" FOREIGN KEY ("event_id") REFERENCES "events"("event_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "eventToSpeaker" ADD CONSTRAINT "eventToSpeaker_speaker_id_speakers_speaker_id_fk" FOREIGN KEY ("speaker_id") REFERENCES "speakers"("speaker_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
