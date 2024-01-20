import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/lib/prisma/prisma.service';

@Injectable()
export class ShortenerRepository {
  constructor(private prismaService: PrismaService) {}

  async create() {
    const res = await this.prismaService.$queryRaw`select * from short_urls`;
    console.log('ceates, res', res);
  }
}
