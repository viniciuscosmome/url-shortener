import { Injectable } from '@nestjs/common';

@Injectable()
export class ShortenerService {
  generateId(): string {
    const alphanumeric =
      'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789';
    let randomId = '';

    for (let count = 0; count < 6; count++) {
      const randomPos = Math.floor(Math.random() * alphanumeric.length);
      randomId += alphanumeric[randomPos];
    }

    return randomId;
  }
}
