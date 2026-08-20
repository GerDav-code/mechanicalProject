import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateRescueDto } from './dto/create-rescue.dto';
import { UpdateRescueDto } from './dto/update-rescue.dto';
import { Rescue } from './entities/rescue.entity';
import { RescuesService } from './rescues.service';

@Controller('rescues')
@UseGuards(JwtAuthGuard)
export class RescuesController {
  constructor(private readonly rescuesService: RescuesService) {}

  @Post()
  async create(
    @Body() createRescueDto: CreateRescueDto,
    @GetUser('userId') clientId: string, 
  ): Promise<Rescue> {
    return this.rescuesService.create(createRescueDto, clientId);
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