import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { RestaurantService } from './services/restaurant.service';
import { Restaurant } from './models/restaurant.entity';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('restaurants')
@UseGuards(AuthGuard)
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Post('add')
  async create(
    @Body() createRestaurantDto: CreateRestaurantDto,
  ): Promise<Restaurant> {
    return this.restaurantService.create(createRestaurantDto);
  }
}
