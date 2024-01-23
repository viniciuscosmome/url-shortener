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
  HttpCode,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ShortenerRepository } from './shortener.repository';
import { ShortenerService } from './shortener.service';
import {
  ShortenUrlDto,
  RedirectByShortUrlCodeDto,
  DeleteUserUrlDto,
  UpdateDestinationUrlDto,
} from './shortener.dtos';
import { AuthGuard } from 'src/guard/auth.guard';
import { Permission } from 'src/guard/auth.decorator';
import { SESSION_PAYLOAD_KEY } from 'src/global/constants';
import type { JwtPayload } from 'src/lib/jwt/jwt.types';
import {
  DataNotFound,
  UrlIsNotFromThisUser,
} from 'src/global/errors/general.errors';

@Controller()
export class ShortenerController {
  constructor(
    private shortenerRepository: ShortenerRepository,
    private shortenerService: ShortenerService,
  ) {}

  @UseGuards(AuthGuard)
  @Permission({ type: 'access', optional: true })
  @Post('/url')
  @HttpCode(201)
  @ApiBearerAuth('access')
  @ApiTags('Manipulação de URL')
  @ApiOperation({ summary: 'Encurta a URL fornecida' })
  async shorten(@Req() req: Request, @Body() input: ShortenUrlDto) {
    const payload = req[SESSION_PAYLOAD_KEY] as JwtPayload;
    const generated = this.shortenerService.generateShortUrlCode();

    await this.shortenerRepository.create({
      code: generated.code,
      destiny: input.destinationUrl,
      userId: payload?.uid,
    });

    return {
      message: 'URL encurtada!',
      shortUrl: generated.shortUrl,
      destinationUrl: input.destinationUrl,
    };
  }

  @UseGuards(AuthGuard)
  @Permission({ type: 'access' })
  @Get('/url')
  @HttpCode(200)
  @ApiBearerAuth('access')
  @ApiTags('Manipulação de URL')
  @ApiOperation({ summary: 'Lista todas as URLs do usuário' })
  async getAllUrls(@Req() req: Request) {
    const { uid } = req[SESSION_PAYLOAD_KEY];
    const urls = await this.shortenerRepository.getAllUrlsByUserId(uid);

    return {
      urls,
    };
  }

  @UseGuards(AuthGuard)
  @Permission({ type: 'access' })
  @Patch('/url')
  @HttpCode(200)
  @ApiBearerAuth('access')
  @ApiTags('Manipulação de URL')
  @ApiOperation({ summary: 'Atualiza o destino de uma URL encurtada' })
  async updateDestine(
    @Req() req: Request,
    @Body() input: UpdateDestinationUrlDto,
  ) {
    const { uid } = req[SESSION_PAYLOAD_KEY];
    const { shortUrlCode, destinationUrl } = input;

    const isFromThisUser =
      await this.shortenerRepository.shortUrlIsFromThisUser({
        code: shortUrlCode,
        userId: uid,
      });

    if (!isFromThisUser) {
      throw new UrlIsNotFromThisUser();
    }

    const updatedInfo = await this.shortenerRepository.updateDestineByCode({
      userId: uid,
      code: shortUrlCode,
      destiny: destinationUrl,
    });

    if (updatedInfo) {
      updatedInfo.code = this.shortenerService.formatShortUrl(updatedInfo.code);
    }

    return {
      message: 'O destino da URL encurtada foi alterado',
      updatedInfo,
    };
  }

  @UseGuards(AuthGuard)
  @Permission({ type: 'access' })
  @Delete('/url/:shortUrlCode')
  @HttpCode(200)
  @ApiBearerAuth('access')
  @ApiTags('Manipulação de URL')
  @ApiOperation({ summary: 'Exclui uma URL do usuário' })
  async excludeUrl(@Req() req: Request, @Param() params: DeleteUserUrlDto) {
    const { uid } = req[SESSION_PAYLOAD_KEY];
    const shortUrlCode = params.shortUrlCode;

    const availableForChanges =
      await this.shortenerRepository.shortUrlIsFromThisUser({
        code: shortUrlCode,
        userId: uid,
      });

    if (!availableForChanges) {
      throw new DataNotFound('URL encurtada não foi encontrada.');
    }

    const now = new Date();

    await this.shortenerRepository.deleteUserUrlByCode({
      code: shortUrlCode,
      userId: uid,
      now,
    });

    return { message: 'A URL encurtada foi excluida' };
  }

  @Get('/:shortUrlCode')
  @HttpCode(200)
  @ApiTags('Redirecionamento')
  @ApiOperation({ summary: 'Redireciona o cliente para a URL de destino' })
  async redirect(
    @Param() params: RedirectByShortUrlCodeDto,
    @Res() res: Response,
  ) {
    const destiny = await this.shortenerRepository.getDestinyByShortUrlCode(
      params.shortUrlCode,
    );

    if (!destiny) {
      throw new DataNotFound();
    }

    return res.redirect(destiny);
  }
}
