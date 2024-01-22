import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SignInDto, SignUpDto } from './user.dto';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Controller('/auth')
@ApiTags('Autenticação')
export class UserController {
  constructor(
    private userRepository: UserRepository,
    private userService: UserService,
  ) {}

  @Post('/sign-up')
  @ApiOperation({ summary: 'Cria uma nova conta' })
  async signUp(@Body() input: SignUpDto) {
    const hashedPassword = await this.userService.hashPassword(input.password);

    await this.userRepository.create({
      email: input.email,
      password: hashedPassword,
    });
  }

  @Post('/sign-in')
  @ApiOperation({ summary: 'Acessa sua conta' })
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
