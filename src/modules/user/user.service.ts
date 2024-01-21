import { Injectable } from '@nestjs/common';
import { compare, hash } from 'bcrypt';

type ValidatePasswordExpect = {
  inputPassword: string;
  userPassword: string;
};

@Injectable()
export class UserService {
  async hashPassword(password: string): Promise<string> {
    const hashed = await hash(password, 2);
    return hashed;
  }

  async validatePassword(input: ValidatePasswordExpect): Promise<boolean> {
    const isValid = await compare(input.inputPassword, input.userPassword);
    return isValid;
  }
}
