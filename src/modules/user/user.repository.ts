import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/lib/prisma/prisma.service';
import { handleDatabaseError } from 'src/shared/errors/handler-database.errors';

type CreateUserExpect = {
  email: string;
  password: string;
};

@Injectable()
export class UserRepository {
  constructor(private prismaService: PrismaService) {}

  async create(input: CreateUserExpect) {
    await this.prismaService.user
      .create({
        data: {
          email: input.email,
          password: input.password,
        },
      })
      .catch(handleDatabaseError);
  }
}
