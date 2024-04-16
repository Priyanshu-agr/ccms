import { FastifyReply, FastifyRequest } from "fastify";
import { EnrollmentNumberAuthSchemaInput } from "./auth.schema";

async function authEnrollmentNumberHandler(
    request: FastifyRequest<{
        Body: EnrollmentNumberAuthSchemaInput
    }>, 
    response: FastifyReply
) {
    // This is a mock implementation of the handler all enrollment numbers are allowed to login we are not using the db service at all
    const body = request.body;

    try {
        if (!body.enrollmentNumber) {
            response.code(400).send({ error: 'Enrollment number is required' });
            return;
        }

        response.code(200).send({ message: 'Enrollment number is valid please login' });
    } catch (error) {
        console.error('Error in authEnrollmentNumberHandler', error);
        response.code(500).send(error);
    }
}

export {
    authEnrollmentNumberHandler
}