import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RescuesModule } from './modules/rescues/rescues.module';
import { TrackingModule } from './modules/tracking/tracking.module';
import { NotificationsModule } from './modules/notifications/notifications.module';

@Module({
  imports: [RescuesModule, TrackingModule, NotificationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
