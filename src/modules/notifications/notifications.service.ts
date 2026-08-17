import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);

  async sendDirectNotification(userId: string, title: string, body: string) {
    this.logger.log(`[PUSH NOTIFICATION] Para usuario ${userId}: ${title} - ${body}`);
    return { success: true, userId, title, body };
  }

  async notifyNearbyMechanics(mechanicIds: string[], rescueId: string) {
    this.logger.log(
      `[PUSH ALERT] Notificando a ${mechanicIds.length} mecánicos sobre el rescate: ${rescueId}`,
    );
    return { success: true, notifiedCount: mechanicIds.length };
  }
}