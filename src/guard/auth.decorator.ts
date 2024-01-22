import { SetMetadata } from '@nestjs/common';
import type { GuardMetadata } from './auth.types';

export const GUARD_KEY = 'guardMetadata';
export function Permission(guardMetadata: GuardMetadata) {
  return SetMetadata(GUARD_KEY, guardMetadata);
}
