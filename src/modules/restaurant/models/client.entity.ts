import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Reservation } from './reservation.entity';

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 20 })
  email: string;

  @Column({ length: 20 })
  phone: string;

  @Column()
  age: number;

  @OneToMany(() => Reservation, (reservation) => reservation.client)
  reservations: Reservation[];
}
