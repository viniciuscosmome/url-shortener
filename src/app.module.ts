import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfiguration } from './lib/jwt/jwt.configuration';
import { ShortenerModule } from './modules/shortener/shortener.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.registerAsync(jwtConfiguration),
    ShortenerModule,
    UserModule,
  ],
})
export class AppModule {}
