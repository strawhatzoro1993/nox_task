import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from './models/restaurant.entity';
import { RestaurantController } from './restaurant.controller';
import { RestaurantService } from './services/restaurant.service';
import { AuthModule } from '../auth/auth.module';
import { Client } from './models/client.entity';
import { Reservation } from './models/reservation.entity';
import { IsAdultGuard } from './guards/is-adult.guard';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([Restaurant, Client, Reservation]),
  ],
  controllers: [RestaurantController],
  providers: [RestaurantService, IsAdultGuard],
})
export class RestaurantModule {}
