import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Client } from './client.entity'; // Asegúrate de importar la entidad correcta
import { Restaurant } from './restaurant.entity'; // Asegúrate de importar la entidad correcta

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Client, (client) => client.reservations)
  client: Client;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.reservations)
  restaurant: Restaurant;

  @Column()
  date: Date;
}
