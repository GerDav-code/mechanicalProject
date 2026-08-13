import { RescueStatus } from '../enums/rescue-status.enum';

export class Rescue {
  id!: string;
  clientId!: string;
  mechanicId?: string; // Opcional (lleva signo ? porque al inicio no hay mecánico)
  vehicleId!: string;
  latitude!: number;
  longitude!: number;
  description!: string;
  status!: RescueStatus;
  createdAt!: Date;
  updatedAt!: Date;
}