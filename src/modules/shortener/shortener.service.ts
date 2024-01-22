import { Injectable } from '@nestjs/common';
import { DESTINE_APLICATION_REDIR_URL } from 'src/global/constants';
import type { GenerateShortURLResponse } from './shortener.types';

@Injectable()
export class ShortenerService {
  generateShortURL(): GenerateShortURLResponse {
    const alphanumeric =
      'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789';
    let id = '';

    for (let count = 0; count < 6; count++) {
      const randomPos = Math.floor(Math.random() * alphanumeric.length);
      id += alphanumeric[randomPos];
    }

    const shortURL = DESTINE_APLICATION_REDIR_URL.concat(id);

    return { id, shortURL };
  }
}
