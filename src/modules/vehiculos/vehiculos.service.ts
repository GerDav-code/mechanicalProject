import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehiculo } from './entities/vehiculo.entity';
import { CreateVehiculoDto } from './dto/create-vehiculo.dto';
import { UpdateVehiculoDto } from './dto/update-vehiculo.dto';

@Injectable()
export class VehiculosService {
  constructor(
    @InjectRepository(Vehiculo)
    private readonly vehiculoRepository: Repository<Vehiculo>,
  ) {}

  async create(createVehiculoDto: CreateVehiculoDto): Promise<Vehiculo> {
    const existingPlacas = await this.vehiculoRepository.findOne({ 
      where: { placas: createVehiculoDto.placas } 
    });

    if (existingPlacas) {
      throw new ConflictException('Estas placas ya están registradas en otro vehículo');
    }

    const vehiculo = this.vehiculoRepository.create(createVehiculoDto);
    return await this.vehiculoRepository.save(vehiculo);
  }

 async findAll(): Promise<Vehiculo[]> {
    return await this.vehiculoRepository.find({ 
      relations: { user: true }
    });
  }

  async findOne(id: string): Promise<Vehiculo> {
    const vehiculo = await this.vehiculoRepository.findOne({ 
      where: { id },
      relations: { user: true }
    });
    
    if (!vehiculo) {
      throw new NotFoundException(`Vehículo con ID ${id} no encontrado`);
    }
    return vehiculo;
  }

  async findByUserId(userId: string): Promise<Vehiculo[]> {
    return await this.vehiculoRepository.find({ where: { userId } });
  }

  async update(id: string, updateVehiculoDto: UpdateVehiculoDto): Promise<Vehiculo> {
    const vehiculo = await this.findOne(id);
    const updatedVehiculo = Object.assign(vehiculo, updateVehiculoDto);
    return await this.vehiculoRepository.save(updatedVehiculo);
  }

  async remove(id: string): Promise<void> {
    const vehiculo = await this.findOne(id);
    await this.vehiculoRepository.remove(vehiculo);
  }
}