import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userRepository = AppDataSource.getRepository(User);

export const registerUser = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { username, password, email, contact } = req.body;

        const existingUser = await userRepository.findOneBy({ email });
        if (existingUser) {
            res.status(400).json({ message: "Email already in use" });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = userRepository.create({
            username,
            password: hashedPassword,
            email,
            contact,
        });
        await userRepository.save(user);

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        next(error);
    }
};

export const loginUser = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { email, password } = req.body;

        const user = await userRepository.findOneBy({ email });
        if (!user) {
            res.status(400).json({ message: "Invalid credentials" });
            return;
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            res.status(400).json({ message: "Invalid credentials" });
            return;
        }

        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error("JWT_SECRET is not defined in environment variables.");
        }
        const token = jwt.sign({ id: user.id, email: user.email }, secret, {
            expiresIn: "1h",
        });

        res.status(200).json({ token });
        return;
    } catch (error) {
        next(error);
    }
};
