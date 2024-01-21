import { InternalServerErrorException } from '@nestjs/common';

export function handleDatabaseError(error: unknown) {
  console.error(error);

  throw new InternalServerErrorException('Erro não controlado :: db');
}
