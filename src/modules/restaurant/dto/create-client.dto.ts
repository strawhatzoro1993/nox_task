import { IsEmail, IsNotEmpty, IsPhoneNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateClientDto {
  @ApiProperty({ description: 'Client name', maxLength: 100 })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Client email', maxLength: 100 })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Client phone number', maxLength: 100 })
  @IsPhoneNumber(null)
  phone: string;

  @ApiProperty({ description: 'Client age', maxLength: 100 })
  @IsNotEmpty()
  age: number;
}
