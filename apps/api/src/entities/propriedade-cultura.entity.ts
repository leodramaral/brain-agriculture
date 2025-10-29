import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { PropriedadeRural } from './propriedade-rural.entity';
import { Cultura } from './cultura.entity';
import { Safra } from './safra.entity';

@Entity('propriedades_culturas')
export class PropriedadeCultura {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true, name: 'planted_area_hectares' })
  planted_area_hectares: number;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  @Column({ type: 'uuid', name: 'property_id' })
  property_id: string;

  @Column({ type: 'uuid', name: 'crop_id' })
  crop_id: string;

  @Column({ type: 'uuid', name: 'harvest_id' })
  harvest_id: string;

  @ManyToOne(() => PropriedadeRural, (propriedade) => propriedade.culturas, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'property_id' })
  propriedade: PropriedadeRural;

  @ManyToOne(() => Cultura, (cultura) => cultura.propriedade_cultura, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'crop_id' })
  cultura: Cultura;

  @ManyToOne(() => Safra, (safra) => safra.propriedade_cultura, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'harvest_id' })
  safra: Safra;
}
