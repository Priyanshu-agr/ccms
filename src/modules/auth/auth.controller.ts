import { FastifyReply, FastifyRequest } from "fastify";
import { EnrollmentNumberAuthSchemaInput, StudentLoginAuthSchemaInput } from "./auth.schema";

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

        response.code(200).send({
            success: true,
            body: {
                message: 'Login',
                email: 'student_soe@jnu.ac.in' 
            }
        });
    } catch (error) {
        console.error('Error in authEnrollmentNumberHandler', error);
        response.code(500).send(error);
    }
}

async function authStudentLoginHandler(
    request: FastifyRequest<{
        Body: StudentLoginAuthSchemaInput
    }>, 
    response: FastifyReply
) {
    // This is a mock implementation of the handler all student logins are allowed we are not using the db service at all
    response.code(200).send({
        success: true,
        body : {
            message: 'Student login successful',
            token: 'some-token' 
        }
    });
}

export {
    authEnrollmentNumberHandler,
    authStudentLoginHandler
}