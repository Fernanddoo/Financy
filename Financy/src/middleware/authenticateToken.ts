import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from '../types/AuthenticatedRequest';
import jwt from "jsonwebtoken";

export const authenticateToken = (
    req: AuthenticatedRequest, 
    res: Response, 
    next: NextFunction
): void => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        res.status(401).json({ message: "Access denied" });
        return; 
    }

    try {
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error("JWT_SECRET is not defined in environment variables.");
        }
        const decoded = jwt.verify(token, secret) as { id: number; email: string };
        req.user = decoded; // Adiciona os dados do token à requisição
        next();
    } catch (error) {
        res.status(403).json({ message: "Invalid token" });
        return;
    }
};
