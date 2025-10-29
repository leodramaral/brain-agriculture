import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { PropriedadeCultura } from './propriedade-cultura.entity';

@Entity('safra')
export class Safra {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, unique: true, name: 'name' })
  name: string;

  @Column({ type: 'int', name: 'year' })
  year: number;

  @Column({ type: 'text', nullable: true, name: 'description' })
  description: string;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  @OneToMany(() => PropriedadeCultura, (propriedadeCultura) => propriedadeCultura.safra)
  propriedade_cultura: PropriedadeCultura[];
}