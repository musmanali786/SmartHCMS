import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User";
import { Doctor } from "./Doctor";

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "timestamp" })
  date: Date;

  @Column({ default: "pending" })
  status: "pending" | "confirmed" | "cancelled";

  // Patient who booked the appointment
  @ManyToOne(() => User, (user) => user.appointments)
  @JoinColumn({ name: "patientId" })
  patient: User;

  // Doctor assigned to the appointment
  @ManyToOne(() => Doctor, (doctor) => doctor.appointments)
  @JoinColumn({ name: "doctorId" })
  doctor: Doctor;

  // Nurse who assisted (if applicable)
  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: "nurseId" })
  nurse?: User;
}