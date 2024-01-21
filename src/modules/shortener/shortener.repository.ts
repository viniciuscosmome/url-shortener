import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/lib/prisma/prisma.service';
import { handleDatabaseError } from 'src/shared/errors/handler-database.errors';

type CreateShortUrlInput = {
  id: string;
  origin: string;
  userId?: string | undefined;
};

@Injectable()
export class ShortenerRepository {
  constructor(private prismaService: PrismaService) {}

  async create(input: CreateShortUrlInput): Promise<void> {
    await this.prismaService.shortUrl
      .create({
        data: {
          id: input.id,
          origin: input.origin,
        },
      })
      .catch(handleDatabaseError);
  }

  async getOriginByUrlId(urlId: string): Promise<string | undefined> {
    const origin = await this.prismaService.shortUrl
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
