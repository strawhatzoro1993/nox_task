import { Controller, Post, Body, UseGuards, Param } from '@nestjs/common';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { RestaurantService } from './services/restaurant.service';
import { Restaurant } from './models/restaurant.entity';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { IsAdultGuard } from './guards/is-adult.guard';

@Controller('restaurants')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Post('add')
  @UseGuards(AuthGuard, RolesGuard)
  async create(
    @Body() createRestaurantDto: CreateRestaurantDto,
  ): Promise<Restaurant> {
    return this.restaurantService.create(createRestaurantDto);
  }

  @Post(':id/reservation')
  @UseGuards(IsAdultGuard)
  async addReservation(
    @Param('id') id: number,
    @Body() createReservationDto: CreateReservationDto,
  ) {
    return this.restaurantService.addReservation(id, createReservationDto);
  }
}
