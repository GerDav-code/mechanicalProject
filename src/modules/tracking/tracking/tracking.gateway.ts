import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*', 
  },
  namespace: 'tracking', 
})
export class TrackingGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server!: Server;

  private readonly logger = new Logger(TrackingGateway.name);

  handleConnection(client: Socket) {
    this.logger.log(`Cliente conectado al socket de tracking: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Cliente desconectado: ${client.id}`);
  }

  @SubscribeMessage('joinRescue')
  handleJoinRescue(
    @MessageBody() payload: any,
    @ConnectedSocket() client: Socket,
  ) {
    const rescueId =
      typeof payload === 'string'
        ? payload
        : payload?.rescueId || payload?.data?.rescueId;

    if (!rescueId) {
      this.logger.warn(`Intento de unirse a sala sin rescueId válido. Payload recibido: ${JSON.stringify(payload)}`);
      return { event: 'error', message: 'rescueId es obligatorio' };
    }

    const room = `rescue_${rescueId}`;
    client.join(room);
    this.logger.log(`Socket ${client.id} se unió a la sala: ${room}`);

    return { event: 'joined', room };
  }

  @SubscribeMessage('updateLocation')
  handleUpdateLocation(@MessageBody() payload: any) {
    const data = typeof payload === 'string' ? JSON.parse(payload) : payload;
    const rescueId = data?.rescueId;
    const mechanicId = data?.mechanicId;
    const latitude = data?.latitude;
    const longitude = data?.longitude;

    if (!rescueId) {
      this.logger.warn(`Coordenadas recibidas sin rescueId`);
      return;
    }

    const room = `rescue_${rescueId}`;

    this.logger.log(
      `[GPS] Rescate ${rescueId} -> Lat: ${latitude}, Lng: ${longitude}`,
    );

    this.server.to(room).emit('locationUpdated', {
      mechanicId,
      latitude,
      longitude,
      timestamp: new Date().toISOString(),
    });
  }
}