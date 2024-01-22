import type { Responses } from './errors.types';

export const responses: Responses = {
  notEmpty: 'Este campo não pode estar vazio.',
  string: 'Informe um texto.',
  UUID: 'Informe um UUID.',
  URL: 'Informe uma URL válida.',
  email: 'Deve ter um formato de e-mail válido.',
  password:
    'Sua senha deve conter 8 caracteres com no mínimo uma letra minúscula, uma letra maiúscula, um número e um caracter especial.',
  shortURL:
    'Deve ter 6 caracteres entre letras maiúsculas, minúsculas e números.',
};
