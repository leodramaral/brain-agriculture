import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Propriedade } from './propriedade.entity';

@Entity('propriedade_cultura')
export class PropriedadeCultura {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true, name: 'planted_area_hectares' })
  planted_area_hectares: number;

  @Column({ type: 'varchar', length: 100, name: 'cultura' })
  cultura: string;

  @Column({ type: 'int', name: 'safra' })
  safra: number;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  @Column({ type: 'uuid', name: 'propriedade_id' })
  propriedade_id: string;

  @ManyToOne(() => Propriedade, (propriedade) => propriedade.propriedade_cultura, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'propriedade_id' })
  propriedade: Propriedade;
}
