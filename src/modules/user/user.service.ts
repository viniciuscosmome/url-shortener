import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import type {
  TokenSubject,
  TokenPayloadExpect,
  ValidatePasswordExpect,
} from './user.types';

@Injectable()
export class UserService {
  private passwordSalt: number;

  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {
    this.passwordSalt = parseInt(
      this.configService.get<string>('PASSWORD_SALT_ROUNDS'),
      10,
    );
  }

  async hashPassword(password: string): Promise<string> {
    const hashed = await hash(password, this.passwordSalt);
    return hashed;
  }

  async validatePassword(input: ValidatePasswordExpect): Promise<boolean> {
    const isValid = await compare(input.inputPassword, input.userPassword);
    return isValid;
  }

  async generateJwtToken(
    subject: TokenSubject,
    payload: TokenPayloadExpect,
  ): Promise<string> {
    const config: JwtSignOptions = {
      subject,
    };

    if (subject === 'access') {
      config.expiresIn = '4h';
    } else if (subject === 'refresh') {
      config.notBefore = '4h';
      config.expiresIn = '1d';
    }

    const token = await this.jwtService.signAsync(payload, config);

    return token;
  }
}
