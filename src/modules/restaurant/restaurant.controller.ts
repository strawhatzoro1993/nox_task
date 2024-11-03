// src/modules/restaurant/restaurant.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { RestaurantService } from './services/restaurant.service';
import { Restaurant } from './models/restaurant.entity';

@Controller('restaurants')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Post('add')
  async create(
    @Body() createRestaurantDto: CreateRestaurantDto,
  ): Promise<Restaurant> {
    return this.restaurantService.create(createRestaurantDto);
  }
}
