import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '../auth/auth.module';
import { ChatModule } from '../chat/chat.module';

function getEnvFilePath() {
  return process.env.NODE_ENV === 'production'
    ? '.env/prod.env'
    : '.env/dev.env';
}

@Module({
  imports: [
    AuthModule,
    ChatModule,
    ConfigModule.forRoot({ envFilePath: getEnvFilePath() }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
