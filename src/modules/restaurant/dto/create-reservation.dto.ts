import { IsDateString, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateClientDto } from './create-client.dto';

export class CreateReservationDto {
  @ValidateNested()
  @Type(() => CreateClientDto) // Necesario para la transformación
  client: CreateClientDto;

  @IsDateString()
  date: string;
}
