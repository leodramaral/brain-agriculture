import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Propriedade } from './propriedade.entity';

@Entity('produtor')
export class Produtor {
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

  @OneToMany(() => Propriedade, (propriedade) => propriedade.produtor)
  propriedades: Propriedade[];
}
