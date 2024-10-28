import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  createEvent,
  deleteEvent,
  getEvents,
} from "../controllers/event.controller.js";

const router = Router();

router.use(verifyJWT);

router.route("/create-event").post(createEvent);

router.route("/get-events").get(getEvents);

router.route("/delete-event/:eventId").delete(deleteEvent);

export default router;
