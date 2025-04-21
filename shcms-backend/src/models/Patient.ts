import { Entity, Column, OneToOne, JoinColumn, PrimaryColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Patient {
  // Define userId as the primary key
  @PrimaryColumn()
  userId: number;

  @OneToOne(() => User, (user) => user.patient, { cascade: true })
  @JoinColumn({ name: "userId" })
  user: User;

  @Column({ nullable: true })
  bloodGroup: string;

  @Column("text", { array: true, nullable: true })
  allergies: string[];

  @Column({ type: "date", nullable: true })
  dateOfBirth: Date;
}
