import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto'; 

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>, 
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findOne({ 
      where: { email: createUserDto.email } 
    });
    
    if (existingUser) {
      throw new ConflictException('El correo ya está registrado');
    }

    const user = this.userRepository.create({
      ...createUserDto,
      passwordHash: createUserDto.password,
    });

    return await this.userRepository.save(user);
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
}