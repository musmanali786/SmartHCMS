import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../models/User";
import { Doctor } from "../models/Doctor";
import { Nurse } from "../models/Nurse";
import { Patient } from "../models/Patient";
import { Appointment } from "../models/Appointment";
import { Department } from "../models/Department";
// Import necessary models/entities for the database connection
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  database: process.env.DB_NAME || "hospital_db",
  synchronize: true, // Auto-create tables (disable in production)
  logging: false,
  entities: [User, Doctor, Nurse, Patient, Appointment, Department],
  migrations: [], // Add migrations if needed
  subscribers: [],
});

// Initialize the database connection
AppDataSource.initialize()
  .then(() => console.log("Database connected!"))
  .catch((error) => console.log("Database error:", error));