@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation)
    private reservationRepo: Repository<Reservation>
  ) {}

  async checkAvailability(dto: ReserveDto): Promise<boolean> {
    const overlapping = await this.reservationRepo.count({
      where: {
        campsiteId: dto.campsiteId,
        startDate: LessThan(dto.endDate),
        endDate: MoreThan(dto.startDate),
        status: Not('cancelled')
      }
    });
    return overlapping === 0;
  }

  async create(dto: ReserveDto): Promise<Reservation> {
    if (!(await this.checkAvailability(dto))) {
      throw new ConflictException('이미 예약된 기간입니다');
    }
    return this.reservationRepo.save(dto);
  }
}