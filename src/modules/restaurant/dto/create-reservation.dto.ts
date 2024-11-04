import { IsDateString, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateClientDto } from './create-client.dto';
import {ApiProperty} from "@nestjs/swagger";

export class CreateReservationDto {
  @ValidateNested()
  @Type(() => CreateClientDto)
  client: CreateClientDto;

  @ApiProperty({ description: 'Date of reservation', maxLength: 100 })
  @IsDateString()
  date: string;
}
