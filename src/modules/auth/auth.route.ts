import express, { Router } from "express";
import * as authController from "./auth.controller";
import { validateRequestBody } from "../../utils/zodValidation";
import { enrollmentNumberAuthSchema, studentLoginAuthSchema, studentMailVerifyAuthSchema, studentSignupAuthSchema } from "./auth.schema";

const router: Router = express.Router();

router.post("/enrollmentNumber", validateRequestBody(enrollmentNumberAuthSchema), authController.authEnrollmentNumberHandler);
router.post("/studentLogin", validateRequestBody(studentLoginAuthSchema) , authController.authStudentLoginHandler);
router.post("/studentSignup", validateRequestBody(studentSignupAuthSchema), authController.authStudentSignupHandler);
router.post("/studentMailVerify", validateRequestBody(studentMailVerifyAuthSchema) , authController.authStudentSignupEmailVerificationLinkSender);
router.get("/studentEmailVerify", authController.authStudentSignupEmailVerificationHandler);

export default router;