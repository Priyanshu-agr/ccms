import express, { Router } from "express";
import * as authController from "./auth.controller";

const router: Router = express.Router();

router.post("/enrollmentNumber", authController.authEnrollmentNumberHandler);
router.post("/studentLogin",authController.authStudentLoginHandler);
router.post("/studentSignup", authController.authStudentSignupHandler);

export default router;