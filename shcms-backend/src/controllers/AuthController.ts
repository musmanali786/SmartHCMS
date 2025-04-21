import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AppDataSource } from '../config/database';
import { User } from '../models/User';
import { Doctor } from '../models/Doctor';
import { Patient } from '../models/Patient';
import { Nurse } from '../models/Nurse';

const JWT_SECRET = process.env.JWT_SECRET || 'hospital_secret';

export class AuthController {
  async register(req: Request, res: Response) {
    const { name, email, password, role, specialization } = req.body;

    try {
      const userRepository = AppDataSource.getRepository(User);
      const existingUser = await userRepository.findOne({ where: { email } });

      if (existingUser) {
        return res.status(400).json({ error: 'Email already exists' });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create user
      const user = userRepository.create({
        name,
        email,
        password: hashedPassword,
        role
      });

      await userRepository.save(user);

      // Create role-specific profile
      if (role === 'doctor') {
        const doctorRepo = AppDataSource.getRepository(Doctor);
        await doctorRepo.save({ user, specialization });
      } else if (role === 'patient') {
        const patientRepo = AppDataSource.getRepository(Patient);
        await patientRepo.save({ user });
      } else if (role === 'nurse') {
        const nurseRepo = AppDataSource.getRepository(Nurse);
        await nurseRepo.save({ user });
      }

      // Generate token
      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        JWT_SECRET,
        { expiresIn: '1d' }
      );

      res.status(201).json({ token, user });
    } catch (error) {
      res.status(500).json({ error: 'Registration failed' });
    }
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOne({ where: { email } });

      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        JWT_SECRET,
        { expiresIn: '1d' }
      );

      res.json({ token, user });
    } catch (error) {
      res.status(500).json({ error: 'Login failed' });
    }
  }
}