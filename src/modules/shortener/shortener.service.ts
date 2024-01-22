import { Injectable } from '@nestjs/common';
import { DESTINE_APLICATION_REDIR_URL } from 'src/global/constants';
import type { GenerateShortURLResponse } from './shortener.types';

@Injectable()
export class ShortenerService {
  formatShortUrl(code: string): string {
    return DESTINE_APLICATION_REDIR_URL.concat(code);
  }

  generateShortURL(): GenerateShortURLResponse {
    const alphanumeric =
      'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789';
    let id = '';

    for (let count = 0; count < 6; count++) {
      const randomPos = Math.floor(Math.random() * alphanumeric.length);
      id += alphanumeric[randomPos];
    }

    const shortURL = this.formatShortUrl(id);

    return { id, shortURL };
  }
}
