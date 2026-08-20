import { Module } from '@nestjs/common';
import { TrackingService } from './tracking.service';
import { TrackingGateway } from './tracking/tracking.gateway';

@Module({
  providers: [TrackingService, TrackingGateway],
  exports: [TrackingGateway],
})
export class TrackingModule {}
