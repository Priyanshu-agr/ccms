import prisma from "../../utils/prisma";

async function getAllClubs() {
  return prisma.club.findMany();
}

async function getClubById(clubId: number) {
  return prisma.club.findUnique({
    where: { club_id: clubId },
  });
}

async function createClub(data: any) {
  return prisma.club.create({
    data,
  });
}

async function updateClub(clubId: number, data: any) {
  return prisma.club.update({
    where: { club_id: clubId },
    data,
  });
}

async function deleteClub(clubId: number) {
  return prisma.club.delete({
    where: { club_id: clubId },
  });
}

async function getClubDetailsWithEvents(clubId: number) {
    const events = await prisma.event.findMany({
        where: {
            club_id: clubId
        }
    });
    
    const club = await prisma.club.findUnique({
        where: {
            club_id: clubId
        }
    });

    return {
        club,
        events
    }
}

export { getAllClubs, getClubById, createClub, updateClub, deleteClub, getClubDetailsWithEvents };