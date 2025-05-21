@Entity()
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  campsiteId: number;

  @Column({ type: 'datetime' })
  startDate: Date;

  @Column({ type: 'datetime' })
  endDate: Date;

  @Column({ default: 'pending' })
  status: 'confirmed' | 'pending' | 'cancelled';

  @CreateDateColumn()
  createdAt: Date;
}
