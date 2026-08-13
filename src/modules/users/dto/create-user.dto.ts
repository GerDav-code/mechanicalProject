import { IsString, IsEmail, IsNotEmpty, MinLength, IsEnum, IsOptional, IsPhoneNumber } from 'class-validator';
import { UserRole } from '../entities/user.entity';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  fullName!: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password!: string;

  @IsString()
  @IsNotEmpty()
  phone!: string;

  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;
}