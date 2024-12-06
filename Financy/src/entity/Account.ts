import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class Account {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column({ type: "text", nullable: true })
    description!: string;

    @Column({ type: "decimal", precision: 10, scale: 2 })
    value!: number;

    @Column({ type: "date" })
    dueDate!: Date;

    @Column({ type: "boolean", default: false })
    paid!: boolean;

    @ManyToOne(() => User, (user) => user.accounts)
    user!: User;
}
