import { Router } from "express";
import { authenticateToken } from '../middleware/authenticateToken';
import { getNotifications, generateNotifications } from "../controllers/notificationController";

export const notificationRoutes = Router();

notificationRoutes.get("/", authenticateToken, getNotifications);
notificationRoutes.post("/generate", generateNotifications);
