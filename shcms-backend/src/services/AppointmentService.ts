import { Appointment } from "../models/Appointment";
import { Doctor } from "../models/Doctor";
import { User } from "../models/User";
import { Between, Repository } from "typeorm";
import { AppDataSource } from "../config/database";

export class AppointmentService {
  private appointmentRepository: Repository<Appointment>;
  private doctorRepository: Repository<Doctor>;

  constructor() {
    this.appointmentRepository = AppDataSource.getRepository(Appointment);
    this.doctorRepository = AppDataSource.getRepository(Doctor);
  }

  // Book a new appointment
  async bookAppointment(
    patient: User,
    doctorId: number,
    date: Date,
    nurse?: User
  ): Promise<Appointment> {
    // Check if doctor exists
    const doctor = await this.doctorRepository.findOne({ where: { id: doctorId } });
    if (!doctor) throw new Error("Doctor not found");

    // Check if slot is available (no overlapping appointments)
    const existingAppointment = await this.appointmentRepository.findOne({
      where: {
        doctor: { id: doctorId },
        date: Between(
          new Date(date.getTime() - 30 * 60000), // 30 mins before
          new Date(date.getTime() + 30 * 60000)  // 30 mins after
        ),
      },
    });

    if (existingAppointment) {
      throw new Error("This time slot is already booked");
    }

    // Create and save the appointment
    const appointment = new Appointment();
    appointment.patient = patient;
    appointment.doctor = doctor;
    appointment.date = date;
    appointment.status = "pending";
    if (nurse) appointment.nurse = nurse;

    return await this.appointmentRepository.save(appointment);
  }

  // Get appointments for a patient
  async getPatientAppointments(patientId: number): Promise<Appointment[]> {
    return this.appointmentRepository.find({
      where: { patient: { id: patientId } },
      relations: ["doctor", "nurse"],
    });
  }
}