import { FastifyReply, FastifyRequest } from "fastify";
import { EnrollmentNumberAuthSchemaInput, StudentLoginAuthSchemaInput } from "./auth.schema";
import { lookupStudentByEnrollmentNumber, studentLoginUsingEmailPassword } from "./auth.service";

async function authEnrollmentNumberHandler(
    request: FastifyRequest<{
        Body: EnrollmentNumberAuthSchemaInput
    }>, 
    response: FastifyReply
) {
    const body = request.body;

    try {

        if (body.enrollmentNumber.length !== 9) {
            response.code(400).send({ error: 'Enrollment number should be of 9 characters' });
            return;
        }
        if (!body.enrollmentNumber) {
            response.code(400).send({ error: 'Enrollment number is required' });
            return;
        }

        const student = await lookupStudentByEnrollmentNumber(body.enrollmentNumber);

        if (!student) {
            response.code(404).send({ error: 'Student not found' });
            return;
        }

        if(student.cis_id)
        {
            response.code(200).send({
                success: true,
                body: {
                    message: 'Login',
                    email: student.cis_id
                }
            });
        }
        else
        {
            response.code(200).send({
                success: true,
                body: {
                    message: 'Signup'
                }
            })
        }
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
    const body = request.body;

    try {
        if (!body.email) {
            response.code(400).send({ error: 'Email is required' });
            return;
        }
        if (!body.password) {
            response.code(400).send({ error: 'Password is required' });
            return;
        }

        const student = await studentLoginUsingEmailPassword(body.email);

        if (!student) {
            response.code(404).send({ error: 'Student not found' });
            return;
        }

        if(student.password !== body.password)
        {
            response.code(401).send({ error: 'Invalid password or id' });
            return;
        }
        // upon successfull authentication need to generate an access token and store it somewhere and return it to the client
        response.code(200).send({
            success: true,
            body : {
                message: 'Student login successful',
                token: 'some-token'
            }
        });
    } catch (error) {
        console.error('Error in authStudentLoginHandler', error);
        response.code(500).send(error);
    }

}

export {
    authEnrollmentNumberHandler,
    authStudentLoginHandler
}