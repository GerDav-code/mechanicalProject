import { IsString, IsEmail, IsNotEmpty, MinLength, IsEnum, IsOptional, IsBoolean, IsNumber } from 'class-validator';
import { UserRole } from '../entities/user.entity';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  firstName!: string;

  @IsString()
  @IsNotEmpty()
  lastName!: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password!: string;

  @IsString()
  @IsNotEmpty()
  phone!: string;

  @IsString()
  @IsOptional()
  emergencyPhone?: string;

  @IsBoolean()
  @IsOptional()
  liveNotifications?: boolean;

  @IsBoolean()
  @IsOptional()
  highPrecisionGps?: boolean;

  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;

  @IsString()
  @IsOptional()
  especialidades?: string;

  @IsNumber()
  @IsOptional()
  experiencia?: number;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsBoolean()
  @IsOptional()
  identificacionOficial?: boolean;

  @IsBoolean()
  @IsOptional()
  licenciaEspecial?: boolean;

  @IsBoolean()
  @IsOptional()
  polizaSeguro?: boolean;

  @IsOptional()
  vehiculo?: any

  @IsString()
  @IsOptional()
  secretCode?: string;
}