import { MigrationInterface, QueryRunner } from "typeorm";

// Faltou uma coluna para averiguar se a conta estava paga ou não
export class AccountsNewColumn1732660941355 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "account" ADD COLUMN "paid" BOOLEAN DEFAULT FALSE NOT NULL`,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "account" DROP COLUMN "paid"`
        )
    }

}
