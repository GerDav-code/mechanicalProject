import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(userDto: any) {
    const hashedPassword = await bcrypt.hash(userDto.password, 10);
    
    const newUser = { ...userDto, password: hashedPassword }; 
    
    return await this.usersService.create(newUser);
  }

  async login(email: string, pass: string) {
    const user = await this.usersService.findByEmail(email);
    
    if (!user || !(await bcrypt.compare(pass, user.passwordHash))) { 
      throw new UnauthorizedException('Correo o contraseña incorrectos');
    }

    const payload = { sub: user.id, email: user.email, role: user.role };
    
    return {
      message: 'Inicio de sesión exitoso',
      access_token: this.jwtService.sign(payload),
      user: { id: user.id, email: user.email }
    };
  }
}