import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { VehiculosService } from './vehiculos.service';
import { CreateVehiculoDto } from './dto/create-vehiculo.dto';
import { UpdateVehiculoDto } from './dto/update-vehiculo.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';

@Controller('vehiculos')
@UseGuards(JwtAuthGuard, RolesGuard)
export class VehiculosController {
  constructor(private readonly vehiculosService: VehiculosService) {}

  @Post()
  @Roles(UserRole.ADMIN, UserRole.MECANICO, UserRole.CLIENTE)
  create(@Body() createVehiculoDto: CreateVehiculoDto) {
    return this.vehiculosService.create(createVehiculoDto);
  }

  @Get()
  findAll() {
    return this.vehiculosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vehiculosService.findOne(id);
  }

  @Get('usuario/:userId')
  findByUserId(@Param('userId') userId: string) {
    return this.vehiculosService.findByUserId(userId);
  }

  @Patch(':id/principal')
  setAsPrincipal(@Param('id') id: string) {
    return this.vehiculosService.setAsPrincipal(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVehiculoDto: UpdateVehiculoDto) {
    return this.vehiculosService.update(id, updateVehiculoDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  remove(@Param('id') id: string) {
    return this.vehiculosService.remove(id);
  }
}