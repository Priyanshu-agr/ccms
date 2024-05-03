import express, { Express } from "express";
import authRoutes from "./modules/auth/auth.route";
import eventRoutes from "./modules/events/event.route";
import clubRoutes from "./modules/clubs/club.route"; // Import the club routes
import "dotenv/config"

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;

app.get("/healthcheck", async (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/events", eventRoutes);
app.use("/auth", authRoutes);
app.use("/clubs", clubRoutes);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});