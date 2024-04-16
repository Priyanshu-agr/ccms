import Fastify from "fastify";

const server = Fastify();

server.get('/healthcheck', async (request, response) => {
    return {status: 'ok'};
})

async function main() {
    try {
        await server.listen({port: 3000});
        console.log('Server started');
    } catch (err) {
        server.log.error(err);
        process.exit(1);
    }
}

main();