import {
  Catch,
  HttpStatus,
  ArgumentsHost,
  ExceptionFilter,
} from '@nestjs/common';
import { GaxiosError } from 'gaxios';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const gmailError = exception as GaxiosError;

    if (gmailError?.response?.data?.error === 'invalid_grant') {
      response.cookie('token', null, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
      });
      response.status(HttpStatus.UNAUTHORIZED);
    } else response.status(HttpStatus.INTERNAL_SERVER_ERROR);

    response.json({
      error: exception.message,
    });
  }
}
