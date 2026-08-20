import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateRescueDto } from './dto/create-rescue.dto';
import { UpdateRescueDto } from './dto/update-rescue.dto';
import { Rescue } from './entities/rescue.entity';
import { RescuesService } from './rescues.service';

@Controller('rescues') // Ruta base: http://localhost:3000/rescues
export class RescuesController {
  constructor(private readonly rescuesService: RescuesService) {}

  @Post()
  async create(@Body() createRescueDto: CreateRescueDto): Promise<Rescue> {
    const mockClientId = 'a123e456-e89b-12d3-a456-426614174000';

    return this.rescuesService.create(createRescueDto, mockClientId);
  }

  @Get('pending')
  async findPendingRescues(): Promise<Rescue[]> {
    return this.rescuesService.findPendingRescues();
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Rescue> {
    return this.rescuesService.findOne(id);
  }

  @Patch(':id/status')
  async updateStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateRescueDto: UpdateRescueDto,
  ): Promise<Rescue> {
    return this.rescuesService.updateStatus(id, updateRescueDto);
  }
}