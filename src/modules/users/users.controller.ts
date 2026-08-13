import { Controller, Post, Body, Patch, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

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
}