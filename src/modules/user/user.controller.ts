import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { SignInDto, SignUpDto } from './user.dto';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Controller('/auth')
export class UserController {
  constructor(
    private userRepository: UserRepository,
    private userService: UserService,
  ) {}

  @Post('/sign-up')
  async signUp(@Body() input: SignUpDto) {
    const hashedPassword = await this.userService.hashPassword(input.password);

    await this.userRepository.create({
      email: input.email,
      password: hashedPassword,
    });
  }

  @Post('/sign-in')
  async signIn(@Body() input: SignInDto) {
    const user = await this.userRepository.getUserByEmail(input.email);

    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const isValidCredential = await this.userService.validatePassword({
      inputPassword: input.password,
      userPassword: user?.password,
    });

    if (!isValidCredential) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    delete user.password;

    const accessToken = await this.userService.generateJwtToken('access', {
      uid: user.id,
    });

    return { accessToken };
  }
}
