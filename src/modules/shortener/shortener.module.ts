import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/lib/prisma/prisma.module';
import { ShortenerController } from './shortener.controller';
import { ShortenerRepository } from './shortener.repository';

@Module({
  imports: [PrismaModule],
  controllers: [ShortenerController],
  providers: [ShortenerRepository],
})
export class ShortenerModule {}
