import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from './models/restaurant.entity';
import { RestaurantController } from './controllers/restaurant.controller';
import { RestaurantService } from './services/restaurant.service';
import { AuthModule } from '../auth/auth.module';
import { Client } from './models/client.entity';
import { Reservation } from './models/reservation.entity';
import { IsAdultGuard } from './guards/is-adult.guard';
import { Order } from './models/order.entity';
import { OrderController } from './controllers/order.controller';
import { OrderService } from './services/order.service';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([Restaurant, Client, Reservation, Order]),
  ],
  controllers: [RestaurantController, OrderController],
  providers: [RestaurantService, OrderService, IsAdultGuard],
})
export class RestaurantModule {}
