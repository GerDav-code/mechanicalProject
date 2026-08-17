import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RescuesController } from './rescues.controller';
import { RescuesService } from './rescues.service';
import { Rescue } from './entities/rescue.entity';
import { NotificationsModule } from '../notifications/notifications.module'; // Importar

@Module({
  imports: [
    TypeOrmModule.forFeature([Rescue]),
    NotificationsModule, 
  ],
  controllers: [RescuesController],
  providers: [RescuesService],
  exports: [RescuesService],
})
export class RescuesModule {}