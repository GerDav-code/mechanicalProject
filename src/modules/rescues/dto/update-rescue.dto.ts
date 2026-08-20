import { IsEnum, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
import { RescueStatus } from '../enums/rescue-status.enum';

export class UpdateRescueDto {
  @IsEnum(RescueStatus, {
    message: `El estado debe ser uno de los valores permitidos: ${Object.values(
      RescueStatus,
    ).join(', ')}`,
  })
  @IsNotEmpty({ message: 'El estado del servicio es obligatorio' })
  status!: RescueStatus;

  @IsUUID('all', { message: 'El ID del mecánico debe ser un UUID válido' })
  @IsOptional()
  mechanicId?: string;
}