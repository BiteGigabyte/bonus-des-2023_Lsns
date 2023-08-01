import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCarEntity1690914403032 implements MigrationInterface {
  name = 'AddCarEntity1690914403032';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "car" ("id" SERIAL NOT NULL, "producer" character varying NOT NULL, "age" integer NOT NULL, "model" character varying NOT NULL, "class" character varying NOT NULL, CONSTRAINT "PK_55bbdeb14e0b1d7ab417d11ee6d" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "car"`);
  }
}
