import { Controller, Post, Body, Patch, Param, UseGuards, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto'; 
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; 

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('mecanicos/lista')
  getMechanicsList() {
    return this.usersService.findMechanicsList();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @Patch(':id/availability')
  toggleAvailability(
    @Param('id') id: string, 
    @Body('isAvailable') isAvailable: boolean
  ) {
    return this.usersService.toggleMechanicAvailability(id, isAvailable);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  updateProfile(
    @Param('id') id: string, 
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.usersService.updateProfile(id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/validar')
  validateMechanic(
    @Param('id') id: string,
    @Body('validationStatus') status: string
  ) {
    return this.usersService.updateValidationStatus(id, status);
  }
}