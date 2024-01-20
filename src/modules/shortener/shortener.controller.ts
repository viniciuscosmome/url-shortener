import { Controller, Post } from '@nestjs/common';

@Controller('/short')
export class ShortenerController {
  constructor() {}

  @Post()
  async shorten() {}
}
