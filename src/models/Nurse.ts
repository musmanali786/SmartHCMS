import { Entity, OneToMany, JoinColumn } from "typeorm";
import { User } from "./User";
import { Department } from "./Department";
import { Appointment } from "./Appointment";

@Entity()
export class Nurse {
  @OneToOne(() => User, (user) => user.nurse, { primary: true })
  @JoinColumn({ name: "userId" })
  user: User;

  @ManyToOne(() => Department, (department) => department.nurses)
  department: Department;

  @OneToMany(() => Appointment, (appointment) => appointment.nurse)
  appointments: Appointment[];
}