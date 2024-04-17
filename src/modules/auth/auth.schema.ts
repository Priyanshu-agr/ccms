import {z} from 'zod';

const enrollmentNumberAuthSchema = z.object({
    enrollmentNumber: z.string().length(9)
})

const studentLoginAuthSchema = z.object({
    email: z.string().email(),
    password: z.string()
})

export type EnrollmentNumberAuthSchemaInput = z.infer<typeof enrollmentNumberAuthSchema>;
export type StudentLoginAuthSchemaInput = z.infer<typeof studentLoginAuthSchema>;