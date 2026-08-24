import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Vehiculo } from '../vehiculos/entities/vehiculo.entity';
import * as bcrypt from 'bcrypt'; 

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Vehiculo)
    private readonly vehiculoRepository: Repository<Vehiculo>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findOne({ 
      where: { email: createUserDto.email } 
    });
    
    if (existingUser) {
      throw new ConflictException('El correo ya está registrado');
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(createUserDto.password, saltRounds);

    const { vehiculo, password, ...userData } = createUserDto;
   
    const user = this.userRepository.create(userData);
    user.passwordHash = hashedPassword; 

    const savedUser = await this.userRepository.save(user);

   if (vehiculo) {
      const nuevoVehiculo = this.vehiculoRepository.create({
        ...vehiculo,
        user: savedUser,
      });
      await this.vehiculoRepository.save(nuevoVehiculo);
    }

    return savedUser;
  }

  async findByEmail(email: string): Promise<User | null> { 
    return await this.userRepository.findOne({ where: { email, isActive: true } });
  }

  async toggleMechanicAvailability(id: string, isAvailable: boolean): Promise<void> { 
    await this.userRepository.update(id, { isAvailable });
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async updateRole(id: string, role: string): Promise<void> {
    await this.userRepository.update(id, { role: role as any });
  }

  async toggleUserStatus(id: string, isActive: boolean): Promise<void> {
    await this.userRepository.update(id, { isActive });
  }
  
  async updateProfile(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    
    if (updateUserDto.password) {
      delete updateUserDto.password; 
    }
    
    const updatedUser = Object.assign(user, updateUserDto);
    return await this.userRepository.save(updatedUser);
  }

  async findById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ 
      where: { id },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        emergencyPhone: true,
        role: true
      }
    });
    
    if (!user) {
      throw new NotFoundException(`Usuario no encontrado`);
    }
    return user;
  }
 
  async findMechanicsList(): Promise<User[]> {
    return await this.userRepository.find({
      where: { role: UserRole.MECANICO as any },
      relations: { vehiculo: true }, 
      order: { createdAt: 'DESC' } 
    });
  }

  async updateValidationStatus(id: string, status: string): Promise<User> {
    const user = await this.findById(id);
    user.validationStatus = status;
    return await this.userRepository.save(user);
  }

}