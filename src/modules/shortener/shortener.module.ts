import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/lib/prisma/prisma.module';
import { ShortenerController } from './shortener.controller';
import { ShortenerRepository } from './shortener.repository';
import { ShortenerService } from './shortener.service';

@Module({
  imports: [PrismaModule],
  controllers: [ShortenerController],
  providers: [ShortenerRepository, ShortenerService],
})
export class ShortenerModule {}
