import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class CheckTokenInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    const refreshToken = request.cookies.token;

    if (!refreshToken) {
      response.status(HttpStatus.UNAUTHORIZED).json('Token not provided');

      return;
    }

    return next.handle();
  }
}
