import { Entity, OneToOne, ManyToOne, OneToMany, JoinColumn, PrimaryColumn } from "typeorm";
import { User } from "./User";
import { Department } from "./Department";
import { Appointment } from "./Appointment";

@Entity()
export class Nurse {
  // Define userId as the primary key
  @PrimaryColumn()
  userId: number;

  @OneToOne(() => User, (user) => user.nurse, { cascade: true })
  @JoinColumn({ name: "userId" })
  user: User;

  @ManyToOne(() => Department, (department) => department.nurses, { nullable: true })
  @JoinColumn({ name: "departmentId" })
  department: Department;

  @OneToMany(() => Appointment, (appointment) => appointment.nurse)
  appointments: Appointment[];
}