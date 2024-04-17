import prisma from "../../utils/prisma";

async function lookupStudentByEnrollmentNumber(enrollment_number: string) {
    return prisma.student.findUnique({
        where: {
            enrollment_number
        }
    });
}

async function studentLoginUsingEmailPassword(cis_id: string) {
    return prisma.student.findFirst({
        where: {
            cis_id
        }
    });
}

export {
    lookupStudentByEnrollmentNumber,
    studentLoginUsingEmailPassword
}