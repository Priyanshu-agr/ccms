import express from "express";
import * as eventController from "./event.controller";

const router = express.Router();

router.get("/", eventController.allEvents);

router.get("/:eventId", eventController.singleEvent);

router.post("/", eventController.createEvent);

router.put("/:eventId", eventController.updateEvent);

router.delete("/:eventId", eventController.deleteEvent);

export default router;