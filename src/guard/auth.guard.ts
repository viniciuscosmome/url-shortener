import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { GUARD_KEY } from './auth.decorator';
import type { GuardMetadata } from './auth.types';
import { SESSION_PAYLOAD_KEY } from 'src/global/constants';
import { handleErrorsJwt } from 'src/lib/jwt/jwt.errors';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
  ) {}

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const guardMetadata = this.reflector.get<GuardMetadata>(
      GUARD_KEY,
      context.getHandler(),
    );
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token && !guardMetadata.optional) {
      handleErrorsJwt();
    }

    if (token) {
      const payload = await this.jwtService
        .verifyAsync(token)
        .then((payload) => payload)
        .catch(handleErrorsJwt);

      if (payload) {
        request[SESSION_PAYLOAD_KEY] = payload;
      }
    }

    return true;
  }
}
