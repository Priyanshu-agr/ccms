import {z} from 'zod';

const enrollmentNumberAuthSchema = z.object({
    enrollmentNumber: z.string().length(9)
})

const studentLoginAuthSchema = z.object({
    email: z.string().email(),
    password: z.string()
})

const studentSignupAuthSchema = z.object({
    email: z.string().email(),
    password: z.string(),
    enrollmentNumber: z.string().length(9)
})

const studentMailVerifyAuthSchema = z.object({
    email: z.string().email(),
    enrollmentNumber: z.string().length(9)
})

export {
    enrollmentNumberAuthSchema,
    studentLoginAuthSchema,
    studentSignupAuthSchema,
    studentMailVerifyAuthSchema

}