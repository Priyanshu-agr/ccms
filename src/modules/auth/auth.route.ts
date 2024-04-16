import { FastifyInstance } from "fastify";
import { authEnrollmentNumberHandler, authStudentLoginHandler } from "./auth.controller";

async function authRoutes(server: FastifyInstance) {

    server.post('/enrollmentNumber', authEnrollmentNumberHandler);
    server.post('/studentLogin', authStudentLoginHandler);
}

export default authRoutes;