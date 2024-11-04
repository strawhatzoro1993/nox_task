import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UnderAgeException } from '../exceptions/under-age.exception';
import { configService } from '../../../config/config.service';

@Injectable()
export class IsAdultGuard implements CanActivate {
  constructor() {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const age = request.body.client.age;
    if (age < configService.getValue('ADULT_AGE')) {
      throw new UnderAgeException();
    }
    return true;
  }
}
