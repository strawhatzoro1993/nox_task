import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Reservation } from './reservation.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  description: string;

  @ManyToOne(() => Reservation, (reservation) => reservation.orders)
  reservation: Reservation;
}
