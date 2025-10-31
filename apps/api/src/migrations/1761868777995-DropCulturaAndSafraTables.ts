import { MigrationInterface, QueryRunner } from "typeorm";

export class DropCulturaAndSafraTables1761868777995 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Remover tabelas cultura e safra
        await queryRunner.query(`DROP TABLE "cultura"`);
        await queryRunner.query(`DROP TABLE "safra"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Recriar tabela cultura
        await queryRunner.query(`CREATE TABLE "cultura" (
            "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
            "name" character varying(100) NOT NULL,
            "description" text,
            "created_at" TIMESTAMP NOT NULL DEFAULT now(),
            "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
            CONSTRAINT "UQ_cultura_name" UNIQUE ("name"),
            CONSTRAINT "PK_cultura_id" PRIMARY KEY ("id")
        )`);
        
        // Recriar tabela safra
        await queryRunner.query(`CREATE TABLE "safra" (
            "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
            "name" character varying(50) NOT NULL,
            "year" integer NOT NULL,
            "description" text,
            "created_at" TIMESTAMP NOT NULL DEFAULT now(),
            "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
            CONSTRAINT "UQ_safra_name" UNIQUE ("name"),
            CONSTRAINT "PK_safra_id" PRIMARY KEY ("id")
        )`);
    }

}
