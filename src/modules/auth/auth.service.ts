import prisma from "../../utils/prisma";

async function lookupStudentByEnrollmentNumber(enrollment_number: string) {
    return prisma.student.findUnique({
        where: {
            enrollment_number
        }
    });
}

export {
    lookupStudentByEnrollmentNumber
}