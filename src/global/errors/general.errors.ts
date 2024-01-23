import { HttpException } from '@nestjs/common';

export class CustomHttpError extends HttpException {
  constructor(message: string, status: number, property?: string) {
    super({ property, message }, status);
  }
}

export class InvalidCredentials extends CustomHttpError {
  constructor(message?: string) {
    super(message || 'Credenciais inválidas.', 401);
  }
}

export class DataNotFound extends CustomHttpError {
  constructor(message?: string) {
    super(message || 'Registro não encontrado.', 404);
  }
}

export class UserAlreadyExists extends CustomHttpError {
  constructor(message?: string) {
    super(message || 'Esse usuário já existe.', 422);
  }
}

export class UrlIsNotFromThisUser extends CustomHttpError {
  constructor(message?: string) {
    super(message || 'Esse dado não pode ser alterado.', 422);
  }
}
