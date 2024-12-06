import { Router } from "express";
import { authenticateToken } from '../middleware/authenticateToken';
import { createAccount, getAccounts, updateAccount, deleteAccount } from "../controllers/accountController";

export const accountRoutes = Router();

accountRoutes.post("/", authenticateToken, createAccount);
accountRoutes.get("/", authenticateToken, getAccounts);
accountRoutes.put("/:id", authenticateToken, updateAccount);
accountRoutes.delete("/:id", authenticateToken, deleteAccount);
