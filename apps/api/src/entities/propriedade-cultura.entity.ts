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
import { Cultura } from './cultura.entity';
import { Safra } from './safra.entity';

@Entity('propriedade_cultura')
export class PropriedadeCultura {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true, name: 'planted_area_hectares' })
  planted_area_hectares: number;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  @Column({ type: 'uuid', name: 'propriedade_id' })
  propriedade_id: string;

  @Column({ type: 'uuid', name: 'cultura_id' })
  cultura_id: string;

  @Column({ type: 'uuid', name: 'safra_id' })
  safra_id: string;

  @ManyToOne(() => Propriedade, (propriedade) => propriedade.propriedade_cultura, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'propriedade_id' })
  propriedade: Propriedade;

  @ManyToOne(() => Cultura, (cultura) => cultura.propriedade_cultura, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'cultura_id' })
  cultura: Cultura;

  @ManyToOne(() => Safra, (safra) => safra.propriedade_cultura, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'safra_id' })
  safra: Safra;
}
