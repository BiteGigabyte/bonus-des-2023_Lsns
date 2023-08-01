import { MigrationInterface, QueryRunner } from 'typeorm';

export class DelereEmail2Colunm1690910877745 implements MigrationInterface {
  name = 'DelereEmail2Colunm1690910877745';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "UQ_66d431b52ef497a4aeca492960e"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "email2"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "email2" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "UQ_66d431b52ef497a4aeca492960e" UNIQUE ("email2")`,
    );
  }
}
