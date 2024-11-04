import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Reservation } from './reservation.entity';

@Entity()
export class Restaurant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 200 })
  address: string;

  @Column()
  capacity: number;

  @OneToMany(() => Reservation, (reservation) => reservation.restaurant)
  reservations: Reservation[];
}
