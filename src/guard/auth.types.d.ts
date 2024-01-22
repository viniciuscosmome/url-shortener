import type { TokenSubject } from 'src/modules/user/user.types';

export type GuardMetadata = {
  type: TokenSubject;
  optional?: boolean | undefined;
};
