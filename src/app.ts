import express from "express";
import authRoutes from "./modules/auth/auth.route";
import eventRoutes from "./modules/events/event.route";
import "dotenv/config"

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;

app.get("/healthcheck", async (req, res) => {
    res.status(200).json({ status: "ok" });
});

app.use("/events", eventRoutes);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});