import { NextFunction, Response } from "express";
import { AuthenticatedRequest } from '../types/AuthenticatedRequest';
import { AppDataSource } from "../data-source";
import { Notification } from "../entity/Notification";
import { Account } from "../entity/Account";
import dayjs from "dayjs";

const notificationRepository = AppDataSource.getRepository(Notification);
const accountRepository = AppDataSource.getRepository(Account);

export const getNotifications = async (
    req: AuthenticatedRequest, 
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const userId = req.user?.id;
        if (!userId) {
        res.status(401).json({ message: "User not authenticated" });
        return;
        }

        const notifications = await notificationRepository.find({
            where: { user: { id: Number(userId) } },
            relations: ["bill", "user"],
        });

        if (notifications.length > 0) {
            res.status(200).json(notifications);
            return; 
        } else {
            res.status(404).json({ notFound: "Could not find any notifications"});
            return;
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch notifications" });
        next(error);
        return; 
    }
};

export const generateNotifications = async (
    req: AuthenticatedRequest, 
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { userId } = req.body;

        const accounts = await accountRepository.find({
            where: { user: { id: userId } },
        });

        // Compara os dias que faltam para vencer a conta com a data de hoje.
        const today = dayjs();
        const dueSoonAccounts = accounts.filter((account) =>
            dayjs(account.dueDate).diff(today, "days") <= 3
        );

        const notifications = dueSoonAccounts.map((account) => ({
            message: `Sua conta ${account.name} está prestes a vencer em ${account.dueDate}.`,
            bill: account,   
            user: { id: userId },
        }));

        const savedNotifications = await notificationRepository.save(notifications);

        res.status(201).json(savedNotifications);
        return; 
    } catch (error) {
        res.status(500).json({ error: "Failed to generate notifications" });
        next(error);
        return; 
    }
};
