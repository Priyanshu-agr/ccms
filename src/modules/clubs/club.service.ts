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
    const club = await prisma.club.findUnique({
        where: {
            club_id: clubId
        },
        include: {
            students_clubs_club_presidentTostudents: {
                select: {
                    first_name: true,
                    last_name: true
                }
            },
            students_clubs_club_vice_presidentTostudents: {
                select: {
                    first_name: true,
                    last_name: true
                }
            },
            students_clubs_club_secretaryTostudents: {
                select: {
                    first_name: true,
                    last_name: true
                }
            },
            students_clubs_club_treasurerTostudents: {
                select: {
                    first_name: true,
                    last_name: true
                }
            },
            events: true
        }
    });

    return club;
}

export { getAllClubs, getClubById, createClub, updateClub, deleteClub, getClubDetailsWithEvents };