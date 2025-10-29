import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAllTables1761774411488 implements MigrationInterface {
    name = 'CreateAllTables1761774411488'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "produtor" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "document" character varying(18) NOT NULL, "name" character varying(255) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_beadf3a0357c1f1240afd68ccf3" UNIQUE ("document"), CONSTRAINT "PK_da0beeee09664030b67354e41e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "propriedade" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "city" character varying(100) NOT NULL, "state" character varying(2) NOT NULL, "total_area_hectares" numeric(10,2) NOT NULL, "agricultural_area_hectares" numeric(10,2) NOT NULL, "vegetation_area_hectares" numeric(10,2) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "produtor_id" uuid NOT NULL, CONSTRAINT "PK_513b78d4d4957b2943d15818591" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cultura" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "description" text, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e5f1cb789275f497042a71020fe" UNIQUE ("name"), CONSTRAINT "PK_b222a9fa80157cef677c6962646" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "propriedade_cultura" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "planted_area_hectares" numeric(10,2), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "propriedade_id" uuid NOT NULL, "cultura_id" uuid NOT NULL, "safra_id" uuid NOT NULL, CONSTRAINT "PK_39e4041810d68ccb07408ca4586" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "safra" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "year" integer NOT NULL, "description" text, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_2c42df2c0c2cc6ecb851ce85404" UNIQUE ("name"), CONSTRAINT "PK_2d0e468845ce63287eb3656750f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "propriedade" ADD CONSTRAINT "FK_258e4ace3476c1929df0de11014" FOREIGN KEY ("produtor_id") REFERENCES "produtor"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "propriedade_cultura" ADD CONSTRAINT "FK_35e977de83fea4941bb8348760c" FOREIGN KEY ("propriedade_id") REFERENCES "propriedade"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "propriedade_cultura" ADD CONSTRAINT "FK_a8c3daf3661260e25b2896e9677" FOREIGN KEY ("cultura_id") REFERENCES "cultura"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "propriedade_cultura" ADD CONSTRAINT "FK_5e1d5bf14d12b633a7b6da18740" FOREIGN KEY ("safra_id") REFERENCES "safra"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "propriedade_cultura" DROP CONSTRAINT "FK_5e1d5bf14d12b633a7b6da18740"`);
        await queryRunner.query(`ALTER TABLE "propriedade_cultura" DROP CONSTRAINT "FK_a8c3daf3661260e25b2896e9677"`);
        await queryRunner.query(`ALTER TABLE "propriedade_cultura" DROP CONSTRAINT "FK_35e977de83fea4941bb8348760c"`);
        await queryRunner.query(`ALTER TABLE "propriedade" DROP CONSTRAINT "FK_258e4ace3476c1929df0de11014"`);
        await queryRunner.query(`DROP TABLE "safra"`);
        await queryRunner.query(`DROP TABLE "propriedade_cultura"`);
        await queryRunner.query(`DROP TABLE "cultura"`);
        await queryRunner.query(`DROP TABLE "propriedade"`);
        await queryRunner.query(`DROP TABLE "produtor"`);
    }

}
