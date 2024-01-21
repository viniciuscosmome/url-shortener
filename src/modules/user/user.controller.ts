import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserExpect } from './user.dto';
import { UserRepository } from './user.repository';

@Controller('/user')
export class UserController {
  constructor(private userRepository: UserRepository) {}

  @Post()
  async create(@Body() input: CreateUserExpect) {
    await this.userRepository.create(input);
  }
}
