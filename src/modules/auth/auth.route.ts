import express from "express";
import * as authController from "./auth.controller";

const router = express.Router();

router.post("/enrollmentNumber", authController.authEnrollmentNumberHandler);
router.post("/studentLogin",authController.authStudentLoginHandler);

export default router;