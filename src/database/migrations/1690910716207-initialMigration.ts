import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1690910716207 implements MigrationInterface {
  name = 'InitialMigration1690910716207';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "userName" character varying NOT NULL, "email" character varying NOT NULL, "email2" character varying NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "age" integer, "password" character varying NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_66d431b52ef497a4aeca492960e" UNIQUE ("email2"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "animal" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "class" character varying NOT NULL, "type" boolean NOT NULL DEFAULT true, "age" integer, "userId" integer, CONSTRAINT "REL_305006f0101340847e1da2edb6" UNIQUE ("userId"), CONSTRAINT "PK_af42b1374c042fb3fa2251f9f42" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "animal" ADD CONSTRAINT "FK_305006f0101340847e1da2edb61" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "animal" DROP CONSTRAINT "FK_305006f0101340847e1da2edb61"`,
    );
    await queryRunner.query(`DROP TABLE "animal"`);
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
