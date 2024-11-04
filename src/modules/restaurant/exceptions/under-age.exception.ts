import { HttpException, HttpStatus } from '@nestjs/common';
import { configService } from '../../../config/config.service';

export class UnderAgeException extends HttpException {
  constructor() {
    super(
      `You are minor, only adults with age ${configService.getValue('ADULT_AGE')} or older can reserve`,
      HttpStatus.FORBIDDEN,
    );
  }
}
