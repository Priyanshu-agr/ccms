import express from "express";
import * as clubController from "./club.controller";

const router = express.Router();

router.get("/", clubController.getAllClubs);
router.get("/:clubId", clubController.getClubById);
router.post("/", clubController.createClub);
router.put("/:clubId", clubController.updateClub);
router.delete("/:clubId", clubController.deleteClub);

export default router;