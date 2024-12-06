import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm";
import { Account } from "./Account";
import { User } from "./User";

@Entity()
export class Notification {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "text" })
    message!: string;

    @ManyToOne(() => Account)
    bill!: Account;

    @ManyToOne(() => User)
    user!: User;

    @CreateDateColumn()
    notificationDate!: Date;
}
