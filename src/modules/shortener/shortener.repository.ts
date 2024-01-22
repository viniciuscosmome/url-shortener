import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/lib/prisma/prisma.service';
import { handleDatabaseError } from 'src/shared/errors/handler-database.errors';
import type { CreateShortURLExpect } from './shortener.types';

@Injectable()
export class ShortenerRepository {
  constructor(private prismaService: PrismaService) {}

  async create(input: CreateShortURLExpect): Promise<string | void> {
    const id = await this.prismaService.shortURL
      .create({
        data: {
          shortURL: input.shortURL,
          origin: input.origin,
          userId: input.userId,
        },
        select: {
          id: true,
        },
      })
      .then((response) => response.id)
      .catch(handleDatabaseError);

    return id;
  }

  async getOriginByShortURL(shortURL: string): Promise<string | void> {
    const origin = await this.prismaService.shortURL
      .update({
        where: {
          shortURL: shortURL,
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

    return origin;
  }
}
