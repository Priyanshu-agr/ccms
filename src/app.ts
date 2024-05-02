import express from "express";
import authRoutes from "./modules/auth/auth.route";
import prisma from "./utils/prisma";
import "dotenv/config"
import { lookupStudentByEnrollmentNumber } from "./modules/auth/auth.service";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;

app.get("/healthcheck", async (req, res) => {
    res.status(200).json({ status: "ok" });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});