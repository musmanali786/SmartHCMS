import { Entity, Column, OneToOne, JoinColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Patient {
  @OneToOne(() => User, (user) => user.patient, { primary: true })
  @JoinColumn({ name: "userId" })
  user: User;

  @Column({ nullable: true })
  bloodGroup: string;

  @Column("text", { array: true, nullable: true })
  allergies: string[];

  @Column({ type: "date", nullable: true })
  dateOfBirth: Date;
}
