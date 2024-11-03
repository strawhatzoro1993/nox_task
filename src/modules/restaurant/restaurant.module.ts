import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from './models/restaurant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Restaurant])],
})
export class RestaurantModule {}
