import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Res,
  UseGuards,
  Req,
  Delete,
  Patch,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ShortenerRepository } from './shortener.repository';
import { ShortenerService } from './shortener.service';
import {
  ShortenURLDto,
  RedirectByShortURLDto,
  DeleteUserUrlDto,
  UpdateShortUrlDto,
} from './shortener.dtos';
import { AuthGuard } from 'src/guard/auth.guard';
import { Permission } from 'src/guard/auth.decorator';
import {
  DESTINE_APLICATION_REDIR_URL,
  SESSION_PAYLOAD_KEY,
} from 'src/global/constants';
import type { JwtPayload } from 'src/lib/jwt/jwt.types';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller()
export class ShortenerController {
  constructor(
    private shortenerRepository: ShortenerRepository,
    private shortenerService: ShortenerService,
  ) {}

  @UseGuards(AuthGuard)
  @Permission({ type: 'access', optional: true })
  @Post('/url')
  @ApiTags('Manipulação de URL')
  @ApiOperation({ summary: 'Encurta a URL fornecida' })
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
  @ApiTags('Manipulação de URL')
  @ApiOperation({ summary: 'Lista todas as URLs do usuário' })
  async getAllUrls(@Req() req: Request) {
    const { uid } = req[SESSION_PAYLOAD_KEY];
    const urls = await this.shortenerRepository.getAllUrlsByUserId(uid);

    return {
      baseRedirectURL: DESTINE_APLICATION_REDIR_URL,
      urls,
    };
  }

  @UseGuards(AuthGuard)
  @Permission({ type: 'access' })
  @Patch('/url')
  @ApiTags('Manipulação de URL')
  @ApiOperation({ summary: 'Atualiza o destino de uma URL encurtada' })
  async updateDestine(@Req() req: Request, @Body() input: UpdateShortUrlDto) {
    const { uid } = req[SESSION_PAYLOAD_KEY];
    const { shortURL, url } = input;

    const updatedInfo = await this.shortenerRepository.updateDestineByCode({
      shortURL: shortURL,
      userId: uid,
      origin: url,
    });

    if (updatedInfo) {
      updatedInfo.shortURL = this.shortenerService.formatShortUrl(
        updatedInfo.shortURL,
      );
    }

    return {
      message: 'O destino da URL encurtada foi alterado',
      updatedInfo,
    };
  }

  @UseGuards(AuthGuard)
  @Permission({ type: 'access' })
  @Delete('/url/:shortURL')
  @ApiTags('Manipulação de URL')
  @ApiOperation({ summary: 'Exclui uma URL do usuário' })
  async excludeUrl(@Req() req: Request, @Param() params: DeleteUserUrlDto) {
    const { uid } = req[SESSION_PAYLOAD_KEY];
    const shortURL = params.shortURL;
    const now = new Date();

    await this.shortenerRepository.deleteUserUrlByCode({
      shortURL,
      now,
      userId: uid,
    });

    return { message: 'A URL encurtada foi deletada' };
  }

  @Get('/:shortURL')
  @ApiTags('Redirecionamento')
  @ApiOperation({ summary: 'Redireciona o cliente para a URL de origem' })
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
