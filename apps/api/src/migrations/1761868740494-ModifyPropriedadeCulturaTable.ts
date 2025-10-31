import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifyPropriedadeCulturaTable1761868740494 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "propriedade_cultura" ADD "cultura" character varying(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "propriedade_cultura" ADD "safra" integer NOT NULL`);
        
        await queryRunner.query(`ALTER TABLE "propriedade_cultura" DROP CONSTRAINT "FK_propriedade_cultura_cultura_id"`);
        await queryRunner.query(`ALTER TABLE "propriedade_cultura" DROP CONSTRAINT "FK_propriedade_cultura_safra_id"`);
        
        await queryRunner.query(`ALTER TABLE "propriedade_cultura" DROP COLUMN "cultura_id"`);
        await queryRunner.query(`ALTER TABLE "propriedade_cultura" DROP COLUMN "safra_id"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "propriedade_cultura" ADD "cultura_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "propriedade_cultura" ADD "safra_id" uuid NOT NULL`);
        
        await queryRunner.query(`ALTER TABLE "propriedade_cultura" ADD CONSTRAINT "FK_propriedade_cultura_cultura_id" FOREIGN KEY ("cultura_id") REFERENCES "cultura"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "propriedade_cultura" ADD CONSTRAINT "FK_propriedade_cultura_safra_id" FOREIGN KEY ("safra_id") REFERENCES "safra"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        
        await queryRunner.query(`ALTER TABLE "propriedade_cultura" DROP COLUMN "safra"`);
        await queryRunner.query(`ALTER TABLE "propriedade_cultura" DROP COLUMN "cultura"`);
    }

}
