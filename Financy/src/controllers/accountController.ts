import { NextFunction, Response } from "express";
import { AuthenticatedRequest } from '../types/AuthenticatedRequest';
import { AppDataSource } from "../data-source";
import { Account } from "../entity/Account";
import { createAccountSchema } from "../validators/accountValidator";
import { updateAccountSchema } from "../validators/updateValidator";

const accountRepository = AppDataSource.getRepository(Account);

export const createAccount = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { error } = createAccountSchema.validate(req.body);
    if (error) {
      res.status(400).json({ error: error.details[0].message });
      return;
    }
    const { name, description, value, dueDate } = req.body;

    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ message: "User not authenticated" });
      return;
    }

    const account = accountRepository.create({
      name,
      description,
      value,
      dueDate,
      user: { id: userId },
    });

    await accountRepository.save(account);
    res.status(201).json(account);
    return;
  } catch (error) {
    res.status(500).json({ error: "Failed to create account" });
    next(error);
    return;
  }
};

export const getAccounts = async (
  
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      res.status(400).json({ message: "User ID is required" });
      return;
    }

    const accounts = await accountRepository.find({
      where: { user: { id: Number(userId) } },
      relations: ["user"],
    });

    res.status(200).json(accounts);
    return;
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch accounts" });
    next(error);
    return;
  }
};

export const updateAccount = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, description, value, dueDate, paid } = req.body;

    const { error } = updateAccountSchema.validate(req.body);
    if (error) {
      res.status(400).json({ error: error.details[0].message });
      return;
    }

    const account = await accountRepository.findOneBy({ id: Number(id) });
    if (!account) {
      res.status(404).json({ message: "Account not found" });
      return;
    }

    if (name !== undefined) account.name = name;
    if (description !== undefined) account.description = description;
    if (value !== undefined) account.value = value;
    if (dueDate !== undefined) account.dueDate = new Date(dueDate);
    if (paid !== undefined) account.paid = paid;

    await accountRepository.save(account);
    res.status(200).json(account);
    return;
  } catch (error) {
    res.status(500).json({ error: "Failed to update account" });
    next(error);
    return;
  }
};

export const deleteAccount = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const result = await accountRepository.delete(id);
    if (result.affected === 0) {
      res.status(404).json({ message: "Account not found" });
      return;
    }
    res.status(200).json({ message: "Account deleted successfully" });
    return;
  } catch (error) {
    res.status(500).json({ error: "Failed to delete account" });
    next(error);
    return;
  }
};
