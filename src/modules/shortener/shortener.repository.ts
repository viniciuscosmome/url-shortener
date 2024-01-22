import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/lib/prisma/prisma.service';
import { handleDatabaseError } from 'src/global/errors/database.errors';
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

  async getAllUrlsByUserId(userId: string) {
    const result = await this.prismaService.shortURL
      .findMany({
        where: {
          userId: userId,
          deletedAt: null,
        },
        select: {
          shortURL: true,
          origin: true,
          views: true,
        },
      })
      .then((response) => response)
      .catch(handleDatabaseError);

    return result;
  }

  async deleteUserUrlByCode(input: {
    userId: string;
    now: Date;
    shortURL: string;
  }) {
    await this.prismaService.shortURL
      .update({
        where: {
          shortURL: input.shortURL,
          userId: input.userId,
        },
        data: {
          deletedAt: input.now,
        },
      })
      .catch(handleDatabaseError);
  }
}
