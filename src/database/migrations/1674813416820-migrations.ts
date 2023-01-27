import { MigrationInterface, QueryRunner } from 'typeorm';

export class migrations1674813416820 implements MigrationInterface {
  name = 'migrations1674813416820';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "post_item" ADD "postId" integer`);
    await queryRunner.query(
      `ALTER TABLE "post_item" ADD CONSTRAINT "FK_46f03f32f479163e11a9bb8b149" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "post_item" DROP CONSTRAINT "FK_46f03f32f479163e11a9bb8b149"`,
    );
    await queryRunner.query(`ALTER TABLE "post_item" DROP COLUMN "postId"`);
  }
}
