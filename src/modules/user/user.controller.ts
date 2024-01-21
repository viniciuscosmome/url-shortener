import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { SignUpExpect, SignInExpect } from './user.dto';
import { UserRepository } from './user.repository';

@Controller('/auth')
export class UserController {
  constructor(private userRepository: UserRepository) {}

  @Post('/sign-up')
  async signUp(@Body() input: SignUpExpect) {
    await this.userRepository.create(input);
  }

  @Post('/sign-in')
  async signIn(@Body() input: SignInExpect) {
    const user = await this.userRepository.getUserByEmail(input.email);

    if (!user || user.password !== input.password) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    console.log('sign-in', input);
  }
}
