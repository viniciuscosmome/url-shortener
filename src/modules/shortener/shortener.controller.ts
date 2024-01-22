import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Res,
  UseGuards,
  Req,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ShortenerRepository } from './shortener.repository';
import { ShortenerService } from './shortener.service';
import { ShortenURLDto, RedirectByURLIdDto } from './shortener.dtos';
import { AuthGuard } from 'src/guard/auth.guard';
import { Permission } from 'src/guard/auth.decorator';
import { SESSION_PAYLOAD_KEY } from 'src/shared/constants';
import type { JwtPayload } from 'src/lib/jwt/jwt.types';

@Controller()
export class ShortenerController {
  constructor(
    private shortenerRepository: ShortenerRepository,
    private shortenerService: ShortenerService,
  ) {}

  @Get('/:URLId')
  async redirect(@Param() params: RedirectByURLIdDto, @Res() res: Response) {
    const origin = await this.shortenerRepository.getOriginByURLId(
      params.URLId,
    );

    if (origin) {
      return res.redirect(origin);
    }

    return res.status(404).json({ message: 'Nenhum registro encontrado!' });
  }

  @UseGuards(AuthGuard)
  @Permission({ type: 'access' })
  @Post('/url')
  async shorten(@Req() req: Request, @Body() input: ShortenURLDto) {
    const payload = req[SESSION_PAYLOAD_KEY] as JwtPayload;
    const generated = this.shortenerService.generateURL();

    await this.shortenerRepository.create({
      id: generated.id,
      origin: input.url,
      userId: payload?.uid,
    });

    return {
      message: 'URL encurtada!',
      shortURL: generated.shortURL,
      originalURL: input.url,
    };
  }
}
