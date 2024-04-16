import Fastify from "fastify";
import authRoutes from "./modules/auth/auth.route";

const server = Fastify();

server.get('/healthcheck', async (request, response) => {
    return {status: 'ok'};
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