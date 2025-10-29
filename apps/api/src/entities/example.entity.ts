// Exemplo de entidade TypeORM
// import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

// @Entity('users')
// export class User {
//   @PrimaryGeneratedColumn('uuid')
//   id: string;

//   @Column({ length: 100 })
//   name: string;

//   @Column({ unique: true })
//   email: string;

//   @CreateDateColumn()
//   createdAt: Date;

//   @UpdateDateColumn()
//   updatedAt: Date;
// }

// Para usar esta entidade:
// 1. Descomente o código acima
// 2. Adicione a entidade no array entities do TypeOrmModule em app.module.ts
// 3. A tabela será criada automaticamente pelo TypeORM em modo development