import Fastify from "fastify";
import authRoutes from "./modules/auth/auth.route";
import prisma from "./utils/prisma";
import * as dotenv from 'dotenv'
import { lookupStudentByEnrollmentNumber } from "./modules/auth/auth.service";

dotenv.config()

const server = Fastify();

server.get('/healthcheck', async (request, response) => {
    response.code(200).send({status: 'ok'});
})

async function main() {

    server.register(authRoutes, {prefix: '/auth'});

    try {
        await server.listen({port: 3000});
        console.log('Server started');
    } catch (err) {
        server.log.error(err);
        process.exit(1);
    }
}

main();