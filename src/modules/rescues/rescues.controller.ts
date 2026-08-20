import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateRescueDto } from './dto/create-rescue.dto';
import { UpdateRescueDto } from './dto/update-rescue.dto';
import { Rescue } from './entities/rescue.entity';
import { RescuesService } from './rescues.service';
import { FilterRescueDto } from './dto/filter-rescue.dto';

@ApiTags('Rescues') 
@ApiBearerAuth()
@Controller('rescues')
@UseGuards(JwtAuthGuard)
export class RescuesController {
  constructor(private readonly rescuesService: RescuesService) {}

  
  @Get('pending')
  async findPendingRescues(): Promise<Rescue[]> {
    return this.rescuesService.findPendingRescues();
  }

  @Get('nearby')
  @ApiOperation({ summary: 'Obtener rescates pendientes dentro de un radio de KM' })
  async findNearby(
    @Query() filterDto: FilterRescueDto,
  ): Promise<Rescue[]> {
    return this.rescuesService.findNearbyPendingRescues(
      filterDto.latitude,
      filterDto.longitude,
      filterDto.radiusKm,
    );
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Rescue> {
    return this.rescuesService.findOne(id);
  }
  
  @Post()
  async create(
    @Body() createRescueDto: CreateRescueDto,
    @GetUser('userId') clientId: string, 
  ): Promise<Rescue> {
    return this.rescuesService.create(createRescueDto, clientId);
  }

  @Patch(':id/status')
  async updateStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateRescueDto: UpdateRescueDto,
  ): Promise<Rescue> {
    return this.rescuesService.updateStatus(id, updateRescueDto);
  }
}