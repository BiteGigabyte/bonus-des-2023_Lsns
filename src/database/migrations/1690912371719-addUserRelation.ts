import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserRelation1690912371719 implements MigrationInterface {
  name = 'AddUserRelation1690912371719';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "animal" DROP CONSTRAINT "FK_305006f0101340847e1da2edb61"`,
    );
    await queryRunner.query(
      `ALTER TABLE "animal" DROP CONSTRAINT "REL_305006f0101340847e1da2edb6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "animal" ADD CONSTRAINT "FK_305006f0101340847e1da2edb61" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "animal" DROP CONSTRAINT "FK_305006f0101340847e1da2edb61"`,
    );
    await queryRunner.query(
      `ALTER TABLE "animal" ADD CONSTRAINT "REL_305006f0101340847e1da2edb6" UNIQUE ("userId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "animal" ADD CONSTRAINT "FK_305006f0101340847e1da2edb61" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
