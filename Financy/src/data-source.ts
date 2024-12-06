import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Account } from "./entity/Account";
import { Notification } from "./entity/Notification";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "ferna@123",
    database: "financy_db",
    synchronize: true, // Ideal para desenvolvimento; em produção, use migrações.
    logging: true,
    entities: [User, Account, Notification],
    subscribers: [],
    migrations: ["src/migrations/*.ts"]
});
