import { Request, Response } from "express";
import { EnrollmentNumberAuthSchemaInput, StudentLoginAuthSchemaInput, StudentSignupAuthSchemaInput } from "./auth.schema";
import { lookupStudentByEnrollmentNumber, studentLoginUsingEmailPassword, generateAccessToken, generateHashedPassword, studentSignupUsingEmailPassword, passwordCheck } from "./auth.service";

async function authEnrollmentNumberHandler(
    request: Request,
    response: Response
) {
    const body = request.body;

    try {

        if (body.enrollmentNumber.length !== 9) {
            response.status(400).send({ error: 'Enrollment number should be of 9 characters' });
            return;
        }
        if (!body.enrollmentNumber) {
            response.status(400).send({ error: 'Enrollment number is required' });
            return;
        }

        const student = await lookupStudentByEnrollmentNumber(body.enrollmentNumber);

        if (!student) {
            response.status(404).send({ error: 'Student not found' });
            return;
        }

        if (student.cis_id) {
            response.status(200).send({
                success: true,
                body: {
                    message: 'Login',
                    email: student.cis_id
                }
            });
        }
        else {
            response.status(200).send({
                success: true,
                body: {
                    message: 'Signup'
                }
            })
        }
    } catch (error) {
        console.error('Error in authEnrollmentNumberHandler', error);
        response.status(500).send(error);
    }
}

async function authStudentLoginHandler(
    request: Request,
    response: Response
) {
    const body = request.body;

    try {
        if (!body.email) {
            response.status(400).send({ error: 'Email is required' });
            return;
        }
        if (!body.password) {
            response.status(400).send({ error: 'Password is required' });
            return;
        }

        const student = await studentLoginUsingEmailPassword(body.email);

        if (!student) {
            response.status(404).send({ error: 'Student not found' });
            return;
        }
        
        if (await passwordCheck(body.password, student.password!)) {
            const accessToken = generateAccessToken(String(student.enrollment_number));
            response.status(200).send({
                success: true,
                body: {
                    message: 'Student login successful',
                    token: accessToken
                }
            });
            return;
        }
        
        response.status(401).send({ error: 'Invalid password or id' });
        return;
        
    } catch (error) {
        console.error('Error in authStudentLoginHandler', error);
        response.status(500).send(error);
    }

}

async function authStudentSignupHandler(
    request: Request,
    response: Response
) {
    const body = request.body;

    try {
        if (!body.email) {
            response.status(400).send({ error: 'Email is required' });
            return;
        }
        if (!body.password) {
            response.status(400).send({ error: 'Password is required' });
            return;
        }
        if (!body.enrollmentNumber) {
            response.status(400).send({ error: 'Enrollment number is required' });
            return;
        }

        const student = await lookupStudentByEnrollmentNumber(body.enrollmentNumber);

        if (!student) {
            response.status(404).send({ error: 'Student not found' });
            return;
        }
        if (student.cis_id && student.password) {
            response.status(400).send({ error: 'Student already registered' });
            return;
        }

        const hash: string = await generateHashedPassword(body.password);

        const newStudent = await studentSignupUsingEmailPassword(body.enrollmentNumber, body.email, hash);
        const accessToken = generateAccessToken(String(newStudent.enrollment_number));

        if (!newStudent) {
            response.status(500).send({ error: 'Error in registering student' });
            return;
        }

        response.status(200).send({
            success: true,
            body: {
                message: 'Student signup successful',
                token: accessToken
            }
        });
    } catch (error) {
        console.error('Error in authStudentSignupHandler', error);
        response.status(500).send(error);
    }
}

export {
    authEnrollmentNumberHandler,
    authStudentLoginHandler,
    authStudentSignupHandler
}