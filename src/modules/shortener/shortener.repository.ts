import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/lib/prisma/prisma.service';

type CreateShortUrlInput = {
  id: string;
  origin: string;
  userId?: string | undefined;
};

@Injectable()
export class ShortenerRepository {
  constructor(private prismaService: PrismaService) {}

  async create(input: CreateShortUrlInput): Promise<void> {
    await this.prismaService.shortUrl.create({
      data: {
        id: input.id,
        origin: input.origin,
      },
    });
  }
}
