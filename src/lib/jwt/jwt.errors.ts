import { UnauthorizedException } from '@nestjs/common';
import type { JsonWebTokenError } from '@nestjs/jwt';

export function handleErrorsJwt(error?: JsonWebTokenError) {
  let message: string;

  switch (error?.message) {
    case 'jwt expired':
      message = 'Sua chave de acesso expirou.';
      break;
    case 'jwt must be provided':
      message = 'Um token de autenticação pecisa ser informado.';
      break;
    case 'jwt malformed':
      message = 'O token de autenticação tem um formato inválido.';
      break;
    case 'jwt not active':
      message = 'Seu token de autenticação ainda não está ativo.';
      break;
    default:
      message = 'Verifique o token de autenticação.';
  }

  throw new UnauthorizedException({ message });
}
