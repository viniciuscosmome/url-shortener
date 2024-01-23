import { Injectable } from '@nestjs/common';
import { DESTINE_APLICATION_REDIR_URL } from 'src/global/constants';
import type { GenerateShortUrlCodeResponse } from './shortener.types';

@Injectable()
export class ShortenerService {
  formatShortUrl(code: string): string {
    return DESTINE_APLICATION_REDIR_URL.concat(code);
  }

  generateShortUrlCode(): GenerateShortUrlCodeResponse {
    const alphanumeric =
      'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789';
    let code = '';

    for (let count = 0; count < 6; count++) {
      const randomPos = Math.floor(Math.random() * alphanumeric.length);
      code += alphanumeric[randomPos];
    }

    const shortUrl = this.formatShortUrl(code);

    return { code, shortUrl };
  }
}
