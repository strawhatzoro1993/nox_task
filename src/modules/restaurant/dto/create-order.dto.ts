import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({
    description: 'Order description (example arroz con pollo)',
    maxLength: 100,
  })
  @IsNotEmpty()
  @IsString()
  description: string;
}
