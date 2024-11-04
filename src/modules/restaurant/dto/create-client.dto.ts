import { IsEmail, IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class CreateClientDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsPhoneNumber(null)
  phone: string;

  @IsNotEmpty()
  age: number;
}
