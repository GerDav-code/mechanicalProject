import { IsString, IsInt, IsNotEmpty, Min, Max, IsUUID, IsBoolean, IsOptional } from 'class-validator';

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
  color!: string;

  @IsString()
  @IsNotEmpty()
  placas!: string;

  @IsBoolean()
  @IsOptional()
  esPrincipal?: boolean;

  @IsUUID()
  @IsNotEmpty()
  userId!: string;
}