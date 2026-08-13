export enum RescueStatus {
  PENDING = 'PENDING',        // Cliente solicitó auxilio
  ACCEPTED = 'ACCEPTED',      // Mecánico aceptó
  EN_ROUTE = 'EN_ROUTE',      // Mecánico en camino
  ON_SITE = 'ON_SITE',        // Mecánico llegó
  COMPLETED = 'COMPLETED',    // Reparación finalizada
  CANCELLED = 'CANCELLED',    // Servicio cancelado
}