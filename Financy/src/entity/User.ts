import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Account } from "./Account";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true })
    username!: string;

    @Column()
    password!: string;

    @Column({ unique: true })
    email!: string;

    @Column({ nullable: true })
    contact!: string;

    @OneToMany(() => Account, (account) => account.user)
    accounts!: Account[];
}
