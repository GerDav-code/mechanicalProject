import { Vehiculo } from 'src/modules/vehiculos/entities/vehiculo.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';


export enum UserRole {
  CLIENTE = 'CLIENTE',
  MECANICO = 'MECANICO',
  ADMIN = 'ADMIN',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 100 })
  fullName!: string;

  @Column({ type: 'varchar', unique: true })
  email!: string;

  @Column({ type: 'varchar' })
  passwordHash!: string; 

  @Column({ type: 'varchar', length: 20 })
  phone!: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.CLIENTE })
  role!: UserRole;

  @Column({ type: 'boolean', default: false })
  isAvailable!: boolean; 

  @Column({ type: 'boolean', default: true })
  isActive!: boolean;

  @OneToMany(() => Vehiculo, Vehiculo => Vehiculo.user)
  vehiculo!: Vehiculo[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}