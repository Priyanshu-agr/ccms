import { FastifyInstance } from "fastify";
import { authEnrollmentNumberHandler } from "./auth.controller";

async function authRoutes(server: FastifyInstance) {

    server.post('/enrollmentNumber', authEnrollmentNumberHandler);

}

export default authRoutes;