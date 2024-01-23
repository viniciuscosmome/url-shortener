import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SignInDto, SignUpDto } from './user.dto';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import {
  InvalidCredentials,
  UserAlreadyExists,
} from 'src/global/errors/general.errors';

@Controller('/auth')
@ApiTags('Autenticação')
export class UserController {
  constructor(
    private userRepository: UserRepository,
    private userService: UserService,
  ) {}

  @Post('/sign-up')
  @HttpCode(201)
  @ApiOperation({ summary: 'Cria uma nova conta' })
  async signUp(@Body() input: SignUpDto) {
    const userExists = await this.userRepository.userEmailAlreadyExists(
      input.email,
    );

    if (userExists) {
      throw new UserAlreadyExists();
    }

    const hashedPassword = await this.userService.hashPassword(input.password);

    await this.userRepository.create({
      email: input.email,
      password: hashedPassword,
    });

    return { message: 'Conta criada com sucesso!' };
  }

  @Post('/sign-in')
  @HttpCode(200)
  @ApiOperation({ summary: 'Acessa sua conta' })
  async signIn(@Body() input: SignInDto) {
    const user = await this.userRepository.getUserByEmail(input.email);

    if (!user) {
      throw new InvalidCredentials();
    }

    const isValidCredential = await this.userService.validatePassword({
      inputPassword: input.password,
      userPassword: user.password,
    });

    if (!isValidCredential) {
      throw new InvalidCredentials();
    }

    delete user.password;

    const accessToken = await this.userService.generateJwtToken('access', {
      uid: user.id,
    });

    return { accessToken };
  }
}
