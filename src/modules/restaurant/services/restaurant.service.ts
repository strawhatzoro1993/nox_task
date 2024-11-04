import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRestaurantDto } from '../dto/create-restaurant.dto';
import { Restaurant } from '../models/restaurant.entity';
import { CreateReservationDto } from '../dto/create-reservation.dto';
import { Reservation } from '../models/reservation.entity';
import { Client } from '../models/client.entity';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurantRepository: Repository<Restaurant>,
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
  ) {}

  async create(createRestaurantDto: CreateRestaurantDto): Promise<Restaurant> {
    const restaurant = this.restaurantRepository.create(createRestaurantDto);
    return this.restaurantRepository.save(restaurant);
  }

  async addReservation(
    restaurantId: number,
    createReservationDto: CreateReservationDto,
  ) {
    const restaurant = await this.restaurantRepository.findOne({
      where: { id: restaurantId },
    });
    if (!restaurant) {
      throw new NotFoundException('Restaurant not found');
    }
    let client = await this.clientRepository.findOne({
      where: { email: createReservationDto.client.email },
    });

    if (!client) {
      client = await this.clientRepository.save(createReservationDto.client);
    }
    const reservations = await this.reservationRepository
      .createQueryBuilder('reservation')
      .innerJoinAndSelect('reservation.restaurant', 'restaurant')
      .innerJoinAndSelect('reservation.client', 'client')
      .where('restaurant.id = :restaurantId', { restaurantId })
      .andWhere('reservation.date = :date', { date: createReservationDto.date })
      .getMany();

    const already_reserved = reservations.some(
      (reservation) => reservation.client.id === client.id,
    );

    if (already_reserved) {
      throw new ConflictException('Client Already reserved');
    }

    //TODO race condition
    if (reservations.length === restaurant.capacity) {
      throw new ConflictException('Restaurant is full');
    } else {
      const reservation = {
        restaurant: { id: restaurantId },
        client: { id: client.id },
        date: createReservationDto.date, // Agregar restaurantId en el formato necesario
      };
      return this.reservationRepository.save(reservation);
    }
  }
}
