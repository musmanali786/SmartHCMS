import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import { AppDataSource } from "../config/database";

const JWT_SECRET = process.env.JWT_SECRET || "hospital_secret";

// Generate JWT token
export const generateToken = (user: User): string => {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: "1d" }
  );
};

// Middleware to authenticate requests
export const authenticate = (allowedRoles?: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { id: number; role: string };
      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOne({ where: { id: decoded.id } });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Check role permissions (if specified)
      if (allowedRoles && !allowedRoles.includes(user.role)) {
        return res.status(403).json({ error: "Access denied" });
      }

      req.user = user; // Attach user to request
      next();
    } catch (error) {
      return res.status(401).json({ error: "Invalid token" });
    }
  };
};