import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Reservation } from '../reservations/reservation.entity';
import { ChatMessage } from '../chat/chat-message.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string; // 암호화되어 저장

  @Column({ length: 50 })
  name: string;

  @Column({ length: 20, nullable: true })
  phone: string | null;

  @Column({ default: 'user' })
  role: 'user' | 'admin'; // 일반 사용자 vs 관리자

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // 관계 정의
  @OneToMany(() => Reservation, reservation => reservation.user)
  reservations: Reservation[];

  @OneToMany(() => ChatMessage, message => message.user)
  messages: ChatMessage[];

  // 소셜 로그인용 필드
  @Column({ nullable: true })
  socialId: string; // 카카오/네이버 고유 ID

  @Column({ type: 'enum', enum: ['local', 'kakao', 'naver'], default: 'local' })
  authType: 'local' | 'kakao' | 'naver';
}