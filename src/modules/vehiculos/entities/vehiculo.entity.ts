import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('vehiculos')
export class Vehiculo {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 50 })
  marca!: string;

  @Column({ type: 'varchar', length: 50 })
  modelo!: string;

  @Column({ type: 'int' })
  anio!: number;

  @Column({ type: 'varchar', length: 30 })
  color!: string;

  @Column({ type: 'varchar', length: 20, unique: true })
  placas!: string;

  @Column({ type: 'boolean', default: false })
  esPrincipal!: boolean;

  @Column()
  userId!: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user!: User;

  @Column({ type: 'varchar', nullable: true })
  tipo!: string; // Ej: Grúa Plataforma, Taller Móvil

  @Column({ type: 'varchar', nullable: true })
  vin!: string;

  @Column({ type: 'varchar', nullable: true })
  capacidad!: string; // Ej: 3.5 Toneladas

  @Column({ type: 'varchar', nullable: true })
  numPolizaSeguro!: string;

  @Column({ type: 'varchar', nullable: true })
  vigenciaSeguro!: string;

  @Column({ type: 'jsonb', nullable: true, default: [] })
  equipamiento!: string[]; 

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}