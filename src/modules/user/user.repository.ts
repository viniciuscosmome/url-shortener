import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/lib/prisma/prisma.service';
import { handleDatabaseError } from 'src/shared/errors/handler-database.errors';

type CreateUserExpect = {
  email: string;
  password: string;
};

type GetUserResponse = {
  id: string;
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
}
