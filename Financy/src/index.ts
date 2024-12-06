import "reflect-metadata";
import express from "express";
import cors from "cors";
import { AppDataSource } from "./data-source";
import { authRoutes } from "./routes/authRoutes";
import { accountRoutes } from "./routes/accountRoutes";
import { notificationRoutes } from "./routes/notificationRoutes";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/accounts", accountRoutes);
app.use("/notifications", notificationRoutes);

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!");
        app.listen(3000, () => console.log("Server is running on port 3000"));
    })
    .catch((error) => console.log("Error during Data Source initialization", error));
