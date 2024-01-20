import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ShortenerModule } from './modules/shortener/shortener.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), ShortenerModule],
})
export class AppModule {}
