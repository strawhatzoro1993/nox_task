import { IsNotEmpty, IsString, IsNumber, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRestaurantDto {
  @ApiProperty({ description: 'Restaurant Name', maxLength: 100 })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  name: string;

  @ApiProperty({ description: 'Restaurant addreess', maxLength: 100 })
  @IsNotEmpty()
  @IsString()
  @MaxLength(200)
  address: string;

  @ApiProperty({ description: 'Restaurant capacity' })
  @IsNotEmpty()
  @IsNumber()
  capacity: number;
}
