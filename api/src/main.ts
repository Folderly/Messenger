import { NestFactory } from '@nestjs/core';
import { AppModule } from './core/app/app.module';

import * as cookieParser from 'cookie-parser';
import * as morgan from 'morgan';
import { urlencoded as urlencodedParser } from 'body-parser';
import { AllExceptionFilter } from './core/app/exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: process.env.CLIENT_URL,
      credentials: true,
    },
  });

  app.use(morgan('tiny'));
  app.use(cookieParser());

  app.use(urlencodedParser({ limit: '50mb', extended: true }));

  app.useGlobalFilters(new AllExceptionFilter());

  const port = parseInt(process.env.PORT) || 5000;
  await app.listen(port, '0.0.0.0');
}
bootstrap();
