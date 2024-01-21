import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { compare, hash } from 'bcrypt';

type ValidatePasswordExpect = {
  inputPassword: string;
  userPassword: string;
};

@Injectable()
export class UserService {
  private passwordSalt: number;

  constructor(private configService: ConfigService) {
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
}
