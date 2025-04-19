import express from "express";
import { AppointmentController } from "../controllers/AppointmentController";
import { authenticate } from "../middleware/auth";

const router = express.Router();
const appointmentController = new AppointmentController();

// Patient books an appointment (or nurse assists)
router.post("/", authenticate(["patient", "nurse"]), appointmentController.bookAppointment);

// Patient views their appointments
router.get("/", authenticate(["patient"]), appointmentController.getAppointments);

export default router;