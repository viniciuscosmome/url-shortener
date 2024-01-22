import { InternalServerErrorException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

function sendMessage(message: string) {
  throw new InternalServerErrorException({ message });
}

const exceptions = {
  P2002: 'O registro precisa ser único.',
  P2007: 'O tipo de dado está diferente do esperado.',
  P2012: 'Um valor obrigatório não foi fornecido.',
  P2025: 'O registro não foi encontrado.',
};

export function handleDatabaseError(error: object) {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    const exception = exceptions[error.code];

    if (exception) {
      sendMessage(exception);
    }
  }

  sendMessage('Erro desconhecido.');
}
