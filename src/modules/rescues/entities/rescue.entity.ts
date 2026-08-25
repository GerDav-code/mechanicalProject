import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { RescueStatus } from '../enums/rescue-status.enum';
import { User } from '../../users/entities/user.entity';
import { Vehiculo } from '../../vehiculos/entities/vehiculo.entity';

@Entity('rescues') 
export class Rescue {
  @PrimaryGeneratedColumn('uuid') 
  id!: string;

  @Column()
  clientId!: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'clientId' })
  client!: User;

  @Column({ nullable: true }) 
  mechanicId?: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'mechanicId' })
  mechanic!: User;

  @Column()
  vehicleId!: string;

  @ManyToOne(() => Vehiculo)
  @JoinColumn({ name: 'vehicleId' })
  vehicle!: Vehiculo;

  @Column({ type: 'float' })
  latitude!: number;

  @Column({ type: 'float' })
  longitude!: number;

  @Column({ type: 'text' })
  description!: string;

  @Column({
    type: 'enum',
    enum: RescueStatus,
    default: RescueStatus.PENDING,
  })
  status!: RescueStatus;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  totalCost?: number;

  @Column({ type: 'text', nullable: true })
  mechanicNotes?: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}