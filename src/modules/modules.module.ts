import { Module } from '@nestjs/common';
import { RestaurantModule } from './restaurant/restaurant.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [RestaurantModule, AuthModule],
  providers: [],
})
export class ModulesModule {}
