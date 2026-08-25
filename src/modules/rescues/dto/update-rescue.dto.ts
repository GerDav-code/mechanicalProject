import { IsEnum, IsNotEmpty, IsOptional, IsUUID, IsNumber, IsString } from 'class-validator';
import { RescueStatus } from '../enums/rescue-status.enum';

export class UpdateRescueDto {
  @IsEnum(RescueStatus, {
    message: `El estado debe ser uno de los valores permitidos: ${Object.values(
      RescueStatus,
    ).join(', ')}`,
  })
  @IsOptional() 
  status?: RescueStatus;

  @IsUUID('all', { message: 'El ID del mecánico debe ser un UUID válido' })
  @IsOptional()
  mechanicId?: string;

  @IsNumber({}, { message: 'El costo total debe ser un número' })
  @IsOptional()
  totalCost?: number;

  @IsString({ message: 'Las notas deben ser texto' })
  @IsOptional()
  mechanicNotes?: string;
}