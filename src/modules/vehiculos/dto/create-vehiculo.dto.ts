import { IsString, IsInt, IsNotEmpty, Min, Max, IsUUID } from 'class-validator';

export class CreateVehiculoDto {
  @IsString()
  @IsNotEmpty()
  marca!: string;

  @IsString()
  @IsNotEmpty()
  modelo!: string;

  @IsInt()
  @Min(1980)
  @Max(new Date().getFullYear() + 1)
  anio!: number;

  @IsString()
  @IsNotEmpty()
  placas!: string;

  @IsUUID()
  @IsNotEmpty()
  userId!: string;
}