import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import { Patient } from "./Patient";
import { Doctor } from "./Doctor";
import { Nurse } from "./Nurse";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column({ type: "enum", enum: ["patient", "doctor", "nurse", "admin"] })
  role: string;

  // Optional: Relations to role-specific tables
  @OneToOne(() => Patient, (patient) => patient.user, { nullable: true })
  patient?: Patient;

  @OneToOne(() => Doctor, (doctor) => doctor.user, { nullable: true })
  doctor?: Doctor;

  @OneToOne(() => Nurse, (nurse) => nurse.user, { nullable: true })
  nurse?: Nurse;
    appointments: any;
}