import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Reservation } from '../../reservation/entities/reservation.entity';

@Entity('reservation_users')
export class ReservationUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id', type: 'integer' })
  userId: number;

  @ManyToOne(
    () => Reservation,
    (reservation: Reservation) => reservation.reservationUsers,
  )
  @JoinColumn({ name: 'reservation_id' }) // Make sure the join column name matches the database column
  reservation: Reservation;

  @Column({ name: 'created_by', type: 'varchar', length: 100, nullable: true })
  createdBy: string;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({ name: 'updated_by', type: 'varchar', length: 100, nullable: true })
  updatedBy: string;

  @Column({ name: 'updated_at', type: 'timestamp', nullable: true })
  updatedAt: Date;
}
