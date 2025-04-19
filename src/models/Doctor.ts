import { Column, Entity, OneToMany } from "typeorm";
import { User } from "./User";
import { Appointment } from "./Appointment";

@Entity()
export class Doctor extends User {
  @Column()
  specialization: string;

  @OneToMany(() => Appointment, (appointment) => appointment.doctor)
  appointments: Appointment[];
}