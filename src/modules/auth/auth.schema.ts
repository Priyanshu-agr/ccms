import {z} from 'zod';

const enrollmentNumberAuthSchema = z.object({
    enrollmentNumber: z.string().length(12)
})

export type EnrollmentNumberAuthSchemaInput = z.infer<typeof enrollmentNumberAuthSchema>;