import { MigrationInterface, QueryRunner } from 'typeorm';

export class migrations1674813091564 implements MigrationInterface {
  name = 'migrations1674813091564';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "post_item" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "description" character varying NOT NULL, "slug" character varying NOT NULL, "userId" integer, CONSTRAINT "PK_07f86884321d93bfbe0e7e7931f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."user_provider_enum" AS ENUM('0', '1', '2', '3')`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "username" character varying, "email" character varying, "firstName" character varying, "lastName" character varying NOT NULL, "phoneNumber" character varying, "birthDate" TIMESTAMP, "password" character varying, "socialId" character varying, "provider" "public"."user_provider_enum" NOT NULL DEFAULT '0', CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_9bd2fe7a8e694dedc4ec2f666f" ON "user" ("socialId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "tag" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "description" character varying NOT NULL, "slug" character varying NOT NULL, CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "post" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "description" character varying NOT NULL, "slug" character varying NOT NULL, "userId" integer, CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "file" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "fileName" character varying NOT NULL, "userId" integer, CONSTRAINT "PK_36b46d232307066b3a2c9ea3a1d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "post_tags_tag" ("postId" integer NOT NULL, "tagId" integer NOT NULL, CONSTRAINT "PK_e9b7b8e6a07bdccb6a954171676" PRIMARY KEY ("postId", "tagId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_b651178cc41334544a7a9601c4" ON "post_tags_tag" ("postId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_41e7626b9cc03c5c65812ae55e" ON "post_tags_tag" ("tagId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "post_item" ADD CONSTRAINT "FK_7314c24035f21c2bb7a211cdedf" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "post" ADD CONSTRAINT "FK_5c1cf55c308037b5aca1038a131" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "file" ADD CONSTRAINT "FK_b2d8e683f020f61115edea206b3" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "post_tags_tag" ADD CONSTRAINT "FK_b651178cc41334544a7a9601c45" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "post_tags_tag" ADD CONSTRAINT "FK_41e7626b9cc03c5c65812ae55e8" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "post_tags_tag" DROP CONSTRAINT "FK_41e7626b9cc03c5c65812ae55e8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "post_tags_tag" DROP CONSTRAINT "FK_b651178cc41334544a7a9601c45"`,
    );
    await queryRunner.query(
      `ALTER TABLE "file" DROP CONSTRAINT "FK_b2d8e683f020f61115edea206b3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "post" DROP CONSTRAINT "FK_5c1cf55c308037b5aca1038a131"`,
    );
    await queryRunner.query(
      `ALTER TABLE "post_item" DROP CONSTRAINT "FK_7314c24035f21c2bb7a211cdedf"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_41e7626b9cc03c5c65812ae55e"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_b651178cc41334544a7a9601c4"`,
    );
    await queryRunner.query(`DROP TABLE "post_tags_tag"`);
    await queryRunner.query(`DROP TABLE "file"`);
    await queryRunner.query(`DROP TABLE "post"`);
    await queryRunner.query(`DROP TABLE "tag"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_9bd2fe7a8e694dedc4ec2f666f"`,
    );
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TYPE "public"."user_provider_enum"`);
    await queryRunner.query(`DROP TABLE "post_item"`);
  }
}
