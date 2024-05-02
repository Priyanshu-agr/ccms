import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export const verifyStudentPermission = async (req: any, res: any, next: any) => {
    try {
        const { userId, clubId } = req.body();
        const club = await prisma.club.findUnique({
            where: {
                club_id: clubId
            }
        });
        if (club?.club_president === userId || club?.club_vice_president === userId || club?.club_secretary === userId || club?.club_treasurer === userId) {
            res.status(200).json({ success: true, body: { message: "User is allowed to access this route" } });
        }
        else {
            res.status(403).json({ success: false, body: { message: "User don't have enough permission to access this route" } });
        }
        next();
    }
    catch (err: any) {
        console.log(err);
        res.send(500).json({ error: err.message });
    }
};