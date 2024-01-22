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
import { ShortenURLDto, RedirectByShortURLDto } from './shortener.dtos';
import { AuthGuard } from 'src/guard/auth.guard';
import { Permission } from 'src/guard/auth.decorator';
import {
  DESTINE_APLICATION_REDIR_URL,
  SESSION_PAYLOAD_KEY,
} from 'src/shared/constants';
import type { JwtPayload } from 'src/lib/jwt/jwt.types';

@Controller('')
export class ShortenerController {
  constructor(
    private shortenerRepository: ShortenerRepository,
    private shortenerService: ShortenerService,
  ) {}

  @UseGuards(AuthGuard)
  @Permission({ type: 'access', optional: true })
  @Post('/url')
  async shorten(@Req() req: Request, @Body() input: ShortenURLDto) {
    const payload = req[SESSION_PAYLOAD_KEY] as JwtPayload;
    const generated = this.shortenerService.generateShortURL();

    const id = await this.shortenerRepository.create({
      shortURL: generated.id,
      origin: input.url,
      userId: payload?.uid,
    });

    return {
      message: 'URL encurtada!',
      id: id,
      shortURL: generated.shortURL,
      originalURL: input.url,
    };
  }

  @UseGuards(AuthGuard)
  @Permission({ type: 'access' })
  @Get('/url')
  async getAllUrls(@Req() req: Request) {
    const { uid } = req[SESSION_PAYLOAD_KEY];
    const urls = await this.shortenerRepository.getAllUrlsByUserId(uid);

    return {
      baseRedirectURL: DESTINE_APLICATION_REDIR_URL,
      urls,
    };
  }

  @Get('/:shortURL')
  async redirect(@Param() params: RedirectByShortURLDto, @Res() res: Response) {
    const origin = await this.shortenerRepository.getOriginByShortURL(
      params.shortURL,
    );

    if (origin) {
      return res.redirect(origin);
    }

    return res.status(404).json({ message: 'Nenhum registro encontrado!' });
  }
}
