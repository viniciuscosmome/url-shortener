import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/lib/prisma/prisma.service';
import { handleDatabaseError } from 'src/global/errors/database.errors';
import type { CreateUserExpect, GetUserResponse } from './user.types';

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

  async getUserByEmail(email: string): Promise<GetUserResponse | undefined> {
    const user = await this.prismaService.user
      .findUnique({
        where: {
          email,
        },
        select: {
          id: true,
          password: true,
        },
      })
      .then((result) => result)
      .catch(handleDatabaseError);

    return user as GetUserResponse;
  }

  async userEmailAlreadyExists(email: string): Promise<boolean | void> {
    const result = await this.prismaService.user
      .findUnique({
        where: {
          email,
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
