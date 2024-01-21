import { Injectable } from '@nestjs/common';

type GenerateURLResponse = {
  id: string;
  shortURL: string;
};

@Injectable()
export class ShortenerService {
  generateURL(): GenerateURLResponse {
    const alphanumeric =
      'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789';
    let id = '';

    for (let count = 0; count < 6; count++) {
      const randomPos = Math.floor(Math.random() * alphanumeric.length);
      id += alphanumeric[randomPos];
    }

    const shortURL = 'http://localhost:3000/'.concat(id);

    return { id, shortURL };
  }
}
