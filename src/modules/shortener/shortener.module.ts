import { Module } from '@nestjs/common';
import { ShortenerController } from './shortener.controller';

@Module({
  controllers: [ShortenerController],
  providers: [],
})
export class ShortenerModule {}
