import { Request, Response } from "express";
import { AppointmentService } from "../services/AppointmentService";
import { User } from "../models/User";

export class AppointmentController {
  private appointmentService: AppointmentService;

  constructor() {
    this.appointmentService = new AppointmentService();
  }

  // POST /appointments - Book a new appointment
  async bookAppointment(req: Request, res: Response) {
    try {
      const { doctorId, date } = req.body;
      const patient = req.user as User; // From JWT middleware
      const nurse = req.body.nurseId ? ({ id: req.body.nurseId } as User) : undefined;

      const appointment = await this.appointmentService.bookAppointment(
        patient,
        doctorId,
        new Date(date),
        nurse
      );

      res.status(201).json(appointment);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: "An unknown error occurred" });
      }
    }
  }

  // GET /appointments - Get patient's appointments
  async getAppointments(req: Request, res: Response) {
    try {
      const patientId = req.user.id;
      const appointments = await this.appointmentService.getPatientAppointments(patientId);
      res.json(appointments);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch appointments" });
    }
  }
}