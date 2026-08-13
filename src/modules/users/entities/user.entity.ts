import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
// import { Vehicle } from '../../vehicles/entities/vehicle.entity';

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

  // @OneToMany(() => Vehicle, vehicle => vehicle.client)
  // vehicles: Vehicle[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}