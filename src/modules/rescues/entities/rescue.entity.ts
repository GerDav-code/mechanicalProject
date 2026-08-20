import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { RescueStatus } from '../enums/rescue-status.enum';

@Entity('rescues') 
export class Rescue {
  @PrimaryGeneratedColumn('uuid') 
  id!: string;

  @Column()
  clientId!: string;

  @Column({ nullable: true }) 
  mechanicId?: string;

  @Column()
  vehicleId!: string;

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

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}