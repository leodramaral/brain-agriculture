import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { PropriedadeRural } from './propriedade-rural.entity';

@Entity('produtores_rurais')
export class ProdutorRural {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 18, unique: true, name: 'document' })
  document: string;

  @Column({ type: 'varchar', length: 255, name: 'name' })
  name: string;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  @OneToMany(() => PropriedadeRural, (propriedade) => propriedade.producer)
  propriedade: PropriedadeRural[];
}