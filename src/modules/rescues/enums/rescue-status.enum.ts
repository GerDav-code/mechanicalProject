export enum RescueStatus {
  PENDING = 'PENDING',        // Cliente solicitó auxilio
  ACCEPTED = 'ACCEPTED',      // Mecánico aceptó
  EN_ROUTE = 'EN_ROUTE',      // Mecánico en camino
  ON_SITE = 'ON_SITE',        // Mecánico llegó
  IN_PROGRESS = 'IN_PROGRESS', // Reparación en sitio
  COMPLETED = 'COMPLETED',    // Reparación finalizada y cobrada
  CANCELLED = 'CANCELLED',    // Servicio cancelado
}