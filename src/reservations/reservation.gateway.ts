@WebSocketGateway()
export class ReservationGateway {
  @WebSocketServer()
  server: Server;

  constructor(private reservationService: ReservationService) {}

  @SubscribeMessage('reserve')
  async handleReservation(client: Socket, payload: ReserveDto) {
    try {
      const reservation = await this.reservationService.create(payload);
      this.server.emit('reservationUpdate', reservation);
      return { success: true };
    } catch (e) {
      return { error: e.message };
    }
  }
}
