import { Module } from '@nestjs/common';
import { ShortenerModule } from './modules/shortener/shortener.module';

@Module({
  imports: [ShortenerModule],
})
export class AppModule {}
