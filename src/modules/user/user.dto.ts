import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CreateUserExpect {
  @IsNotEmpty({ message: 'Este campo não pode estar vazio' })
  @IsEmail(undefined, { message: 'O e-mail tem um formato inválido' })
  email: string;

  @IsNotEmpty({ message: 'Este campo não pode estar vazio' })
  @IsString({ message: 'A senha deve estar no formato de TEXTO' })
  @IsStrongPassword(undefined, {
    message:
      'A senha deve conter no mínimo 8 caracteres e incluir letra maiúscula, letra minúscula, um número e um símbolo',
  })
  password: string;
}
