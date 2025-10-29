import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateInitialTables1761764942259 implements MigrationInterface {
    name = 'CreateInitialTables1761764942259'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "produtores_rurais" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "document" character varying(18) NOT NULL, "name" character varying(255) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_f1fc90e7994e4998c1474c3d135" UNIQUE ("document"), CONSTRAINT "PK_ddc7c49862aa12badd305251417" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "propriedades_rurais" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "farm_name" character varying(255) NOT NULL, "city" character varying(100) NOT NULL, "state" character varying(2) NOT NULL, "total_area_hectares" numeric(10,2) NOT NULL, "agricultural_area_hectares" numeric(10,2) NOT NULL, "vegetation_area_hectares" numeric(10,2) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "producer_id" uuid NOT NULL, CONSTRAINT "PK_af85764b125f482ba91ddf77887" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "culturas" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "description" text, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_3394fa6cb6b099aadd3e6b77021" UNIQUE ("name"), CONSTRAINT "PK_b6e03971235e32ad695a70264fe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "propriedades_culturas" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "planted_area_hectares" numeric(10,2), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "property_id" uuid NOT NULL, "crop_id" uuid NOT NULL, "harvest_id" uuid NOT NULL, CONSTRAINT "PK_e97923f28fde8846aaccf3c0b70" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "safras" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "year" integer NOT NULL, "description" text, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_53a4d59bca3cf6fd33020d6a0d1" UNIQUE ("name"), CONSTRAINT "PK_3cb7ebbb540db145b066ef34403" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "propriedades_rurais" ADD CONSTRAINT "FK_9ff1ca8f54c6cba58a70242493e" FOREIGN KEY ("producer_id") REFERENCES "produtores_rurais"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "propriedades_culturas" ADD CONSTRAINT "FK_07bf678fa0275b2e0a4ab09919c" FOREIGN KEY ("property_id") REFERENCES "propriedades_rurais"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "propriedades_culturas" ADD CONSTRAINT "FK_4cfd46bc20f70d423c3696355fd" FOREIGN KEY ("crop_id") REFERENCES "culturas"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "propriedades_culturas" ADD CONSTRAINT "FK_7ebf064826b7d1d6ef50ff40516" FOREIGN KEY ("harvest_id") REFERENCES "safras"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "propriedades_culturas" DROP CONSTRAINT "FK_7ebf064826b7d1d6ef50ff40516"`);
        await queryRunner.query(`ALTER TABLE "propriedades_culturas" DROP CONSTRAINT "FK_4cfd46bc20f70d423c3696355fd"`);
        await queryRunner.query(`ALTER TABLE "propriedades_culturas" DROP CONSTRAINT "FK_07bf678fa0275b2e0a4ab09919c"`);
        await queryRunner.query(`ALTER TABLE "propriedades_rurais" DROP CONSTRAINT "FK_9ff1ca8f54c6cba58a70242493e"`);
        await queryRunner.query(`DROP TABLE "safras"`);
        await queryRunner.query(`DROP TABLE "propriedades_culturas"`);
        await queryRunner.query(`DROP TABLE "culturas"`);
        await queryRunner.query(`DROP TABLE "propriedades_rurais"`);
        await queryRunner.query(`DROP TABLE "produtores_rurais"`);
    }

}
