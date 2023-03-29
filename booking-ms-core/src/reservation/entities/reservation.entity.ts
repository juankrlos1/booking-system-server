import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ReservationUser } from '../../reservation-user/entities/reservation-user.entity';

@Entity('reservations')
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id', type: 'integer' })
  userId: number;

  @Column({ name: 'room_id', type: 'integer' })
  roomId: number;

  @Column({ name: 'start_time', type: 'timestamp' })
  startTime: Date;

  @Column({ name: 'end_time', type: 'timestamp' })
  endTime: Date;

  @Column({ name: 'reservation_date', type: 'date' })
  reservationDate: Date;

  @Column({ type: 'varchar', length: 255 })
  reason: string;

  @Column({ type: 'integer' })
  attendees: number;

  @Column({ default: false, type: 'boolean' })
  recurring: boolean;

  @Column({ type: 'varchar', length: 250, nullable: true })
  status: string;

  @OneToMany(
    () => ReservationUser,
    (reservationUser: ReservationUser) => reservationUser.reservation,
  )
  reservationUsers: ReservationUser[];

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({ name: 'created_by', type: 'varchar', length: 100, nullable: true })
  createdBy: string;

  @Column({ name: 'updated_at', type: 'timestamp', nullable: true })
  updatedAt: Date;

  @Column({ name: 'updated_by', type: 'varchar', length: 100, nullable: true })
  updatedBy: string;
}
