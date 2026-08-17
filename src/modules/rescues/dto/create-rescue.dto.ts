import {
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateRescueDto {
  @IsUUID('4', { message: 'El ID del vehículo debe ser un UUID v4 válido' })
  @IsNotEmpty({ message: 'El ID del vehículo es obligatorio' })
  vehicleId!: string;

  @IsLatitude({ message: 'La latitud debe ser una coordenada válida (-90 a 90)' })
  @IsNotEmpty({ message: 'La latitud es obligatoria' })
  latitude!: number;

  @IsLongitude({ message: 'La longitud debe ser una coordenada válida (-180 a 180)' })
  @IsNotEmpty({ message: 'La longitud es obligatoria' })
  longitude!: number;

  @IsString({ message: 'La descripción debe ser un texto' })
  @IsNotEmpty({ message: 'Debes proporcionar una descripción del problema' })
  @MinLength(5, { message: 'La descripción debe tener al menos 5 caracteres' })
  @MaxLength(255, { message: 'La descripción no puede exceder los 255 caracteres' })
  description!: string;
}