import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/lib/prisma/prisma.service';
import { handleDatabaseError } from 'src/shared/errors/handler-database.errors';
import type { CreateShortURLInput } from './shortener.types';

@Injectable()
export class ShortenerRepository {
  constructor(private prismaService: PrismaService) {}

  async create(input: CreateShortURLInput): Promise<void> {
    await this.prismaService.shortURL
      .create({
        data: {
          id: input.id,
          origin: input.origin,
          userId: input.userId,
        },
      })
      .catch(handleDatabaseError);
  }

  async getOriginByURLId(urlId: string): Promise<string | undefined> {
    const origin = await this.prismaService.shortURL
      .update({
        where: {
          id: urlId,
          deletedAt: null,
        },
        data: {
          views: {
            increment: 1,
          },
        },
        select: {
          origin: true,
        },
      })
      .then((result) => {
        if (result) {
          return result.origin;
        }

        return;
      })
      .catch(handleDatabaseError);

    return origin as string;
  }
}
