import { Body, Controller, Param, Post } from '@nestjs/common';
import { OrderService } from '../services/order.service';
import { Order } from '../models/order.entity';
import { CreateOrderDto } from '../dto/create-order.dto';

@Controller('orders/reservation')
export class OrderController {
  constructor(private readonly restaurantService: OrderService) {}

  @Post(':reservationId')
  async createOrder(
    @Param('reservationId') reservationId: number,
    @Body() createOrderDto: CreateOrderDto,
  ): Promise<Order> {
    return this.restaurantService.createOrder(reservationId, createOrderDto);
  }
}
