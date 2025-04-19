import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Doctor } from "./Doctor";
import { Nurse } from "./Nurse";

@Entity()
export class Department {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => Doctor, (doctor) => doctor.department)
  doctors: Doctor[];

  @OneToMany(() => Nurse, (nurse) => nurse.department)
  nurses: Nurse[];
}
