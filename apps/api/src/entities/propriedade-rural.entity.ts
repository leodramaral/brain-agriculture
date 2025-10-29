import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { ProdutorRural } from './produtor-rural.entity';
import { PropriedadeCultura } from './propriedade-cultura.entity';

@Entity('propriedades_rurais')
export class PropriedadeRural {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, name: 'farm_name' })
  farm_name: string;

  @Column({ type: 'varchar', length: 100, name: 'city' })
  city: string;

  @Column({ type: 'varchar', length: 2, name: 'state' })
  state: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, name: 'total_area_hectares' })
  total_area_hectares: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, name: 'agricultural_area_hectares' })
  agricultural_area_hectares: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, name: 'vegetation_area_hectares' })
  vegetation_area_hectares: number;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  @Column({ type: 'uuid', name: 'producer_id' })
  producer_id: string;

  @ManyToOne(() => ProdutorRural, (produtor) => produtor.propriedade, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'producer_id' })
  producer: ProdutorRural;

  @OneToMany(() => PropriedadeCultura, (propriedadeCultura) => propriedadeCultura.propriedade)
  culturas: PropriedadeCultura[];
}
