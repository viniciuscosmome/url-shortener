import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/lib/prisma/prisma.service';
import { handleDatabaseError } from 'src/global/errors/database.errors';
import type {
  CreateShortUrlCodeExpect,
  ShortUrlCodeIsFromThisUser,
  UpdateDestinationUrlExpect,
  UpdateDestinationUrlResponse,
} from './shortener.types';

@Injectable()
export class ShortenerRepository {
  constructor(private prismaService: PrismaService) {}

  async create(input: CreateShortUrlCodeExpect): Promise<void> {
    await this.prismaService.shortUrl
      .create({
        data: {
          code: input.code,
          destiny: input.destiny,
          userId: input.userId,
        },
        select: {
          id: true,
        },
      })
      .then((response) => response.id)
      .catch(handleDatabaseError);
  }

  async getDestinyByShortUrlCode(code: string): Promise<string | void> {
    const destinationUrl = await this.prismaService.shortUrl
      .update({
        where: {
          code: code,
          deletedAt: null,
        },
        data: {
          views: {
            increment: 1,
          },
        },
        select: {
          destiny: true,
        },
      })
      .then((result) => {
        if (result) {
          return result.destiny;
        }

        return;
      })
      .catch(handleDatabaseError);

    return destinationUrl;
  }

  async getAllUrlsByUserId(userId: string) {
    const result = await this.prismaService.shortUrl
      .findMany({
        where: {
          userId: userId,
          deletedAt: null,
        },
        select: {
          code: true,
          destiny: true,
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
    code: string;
  }) {
    await this.prismaService.shortUrl
      .update({
        where: {
          code: input.code,
          userId: input.userId,
          deletedAt: null,
        },
        data: {
          deletedAt: input.now,
        },
      })
      .catch(handleDatabaseError);
  }

  async updateDestineByCode(
    input: UpdateDestinationUrlExpect,
  ): Promise<UpdateDestinationUrlResponse | void> {
    const updatedInfo = await this.prismaService.shortUrl
      .update({
        where: {
          userId: input.userId,
          code: input.code,
          deletedAt: null,
        },
        data: {
          destiny: input.destiny,
        },
        select: {
          code: true,
          destiny: true,
          views: true,
        },
      })
      .then((response) => response)
      .catch(handleDatabaseError);

    return updatedInfo;
  }

  async shortUrlIsFromThisUser(
    input: ShortUrlCodeIsFromThisUser,
  ): Promise<boolean | void> {
    const result = await this.prismaService.shortUrl
      .findUnique({
        where: {
          code: input.code,
          userId: input.userId,
          deletedAt: null,
        },
        select: {
          id: true,
        },
      })
      .then((response) => !!response)
      .catch(handleDatabaseError);

    return result;
  }
}
