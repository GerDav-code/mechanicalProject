import { Controller, Post, Body, Patch, Param, UseGuards } from '@nestjs/common';
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

  @Patch(':id/availability')
  toggleAvailability(
    @Param('id') id: string, 
    @Body('isAvailable') isAvailable: boolean
  ) {
    return this.usersService.toggleMechanicAvailability(id, isAvailable);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/perfil')
  updateProfile(
    @Param('id') id: string, 
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.usersService.updateProfile(id, updateUserDto);
  }
}