import { ApiProperty, PickType } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { responses } from 'src/global/errors/validation-responses';

export class SignUpDto {
  @IsNotEmpty({ message: responses.notEmpty })
  @IsEmail(undefined, { message: responses.email })
  @ApiProperty({ example: 'username@example.com' })
  email: string;

  @IsNotEmpty({ message: responses.notEmpty })
  @IsString({ message: responses.string })
  @IsStrongPassword(undefined, { message: responses.password })
  @ApiProperty({ example: 'strongW#3' })
  password: string;
}

export class SignInDto extends PickType(SignUpDto, ['email', 'password']) {}
