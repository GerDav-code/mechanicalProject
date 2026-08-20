import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotificationsService } from '../notifications/notifications.service';
import { CreateRescueDto } from './dto/create-rescue.dto';
import { UpdateRescueDto } from './dto/update-rescue.dto';
import { Rescue } from './entities/rescue.entity';
import { RescueStatus } from './enums/rescue-status.enum';

@Injectable()
export class RescuesService {
  constructor(
    @InjectRepository(Rescue)
    private readonly rescueRepository: Repository<Rescue>,
    private readonly notificationsService: NotificationsService,
  ) {}

  async create(createRescueDto: CreateRescueDto, clientId: string): Promise<Rescue> {
    const activeRescue = await this.rescueRepository.findOne({
      where: [
        { clientId, status: RescueStatus.PENDING },
        { clientId, status: RescueStatus.ACCEPTED },
        { clientId, status: RescueStatus.EN_ROUTE },
        { clientId, status: RescueStatus.ON_SITE },
      ],
    });

    if (activeRescue) {
      throw new BadRequestException('Ya tienes un servicio de auxilio activo en curso');
    }

    const newRescue = this.rescueRepository.create({
      ...createRescueDto,
      clientId,
      status: RescueStatus.PENDING,
    });

    const savedRescue = await this.rescueRepository.save(newRescue);

    await this.notificationsService.notifyNearbyMechanics(
      ['mechanic-1', 'mechanic-2'], // IDs de prueba
      savedRescue.id,
    );

    return savedRescue;
  }

  async findOne(id: string): Promise<Rescue> {
    const rescue = await this.rescueRepository.findOne({ where: { id } });

    if (!rescue) {
      throw new NotFoundException(`La solicitud de rescate con ID ${id} no existe`);
    }

    return rescue;
  }

  async updateStatus(id: string, updateRescueDto: UpdateRescueDto): Promise<Rescue> {
    const rescue = await this.findOne(id);

    if (rescue.status === RescueStatus.COMPLETED || rescue.status === RescueStatus.CANCELLED) {
      throw new BadRequestException('No se puede modificar un servicio finalizado o cancelado');
    }

    if (updateRescueDto.mechanicId && !rescue.mechanicId) {
      rescue.mechanicId = updateRescueDto.mechanicId;
    }

    rescue.status = updateRescueDto.status;

    const updatedRescue = await this.rescueRepository.save(rescue);

    await this.notificationsService.sendDirectNotification(
      rescue.clientId,
      'Actualización de tu servicio',
      `El estado de tu auxilio vial cambió a: ${rescue.status}`,
    );

    return updatedRescue;
  }

  async findPendingRescues(): Promise<Rescue[]> {
    return this.rescueRepository.find({
      where: { status: RescueStatus.PENDING },
      order: { createdAt: 'DESC' },
    });
  }

  async findNearbyPendingRescues(
    lat: number,
    lng: number,
    radiusKm: number = 10,
  ): Promise<Rescue[]> {
    const haversineFormula = `
      (6371 * acos(
        cos(radians(:lat)) * cos(radians(rescue.latitude)) *
        cos(radians(rescue.longitude) - radians(:lng)) +
        sin(radians(:lat)) * sin(radians(rescue.latitude))
      ))
    `;

    return await this.rescueRepository
      .createQueryBuilder('rescue')
      .addSelect(haversineFormula, 'distance')
      .where('rescue.status = :status', { status: RescueStatus.PENDING })
      .andWhere(`${haversineFormula} <= :radiusKm`, { radiusKm })
      .setParameters({ lat, lng, radiusKm })
      .orderBy('distance', 'ASC')
      .getMany();
  }
}