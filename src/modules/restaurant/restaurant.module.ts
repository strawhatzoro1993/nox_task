import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from './models/restaurant.entity';
import { RestaurantController } from './restaurant.controller';
import { RestaurantService } from './services/restaurant.service';

@Module({
  imports: [TypeOrmModule.forFeature([Restaurant])],
  controllers: [RestaurantController],
  providers: [RestaurantService],
})
export class RestaurantModule {}
