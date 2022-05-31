import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { Request } from 'express';
import { CheckTokenInterceptor } from '../app/check-token.interceptor';
import { ChatService } from './chat.service';
import { IChatController } from './types/chat.controller.types';

@UseInterceptors(CheckTokenInterceptor)
@Controller('chat')
export class ChatController {
  constructor(private readonly _ChatService: ChatService) {}

  @Get('current-user')
  async getCurrentUser(@Req() request: Request) {
    const refreshToken = request.cookies.token;

    return this._ChatService.getCurrentUser({ refreshToken });
  }

  @Get('contacts')
  async getContacts(@Req() request: Request) {
    const refreshToken = request.cookies.token;

    return this._ChatService.getContacts({
      refreshToken,
    });
  }

  @Get('messages')
  async getMessages(
    @Req() request: Request,

    @Query('threadId') threadId: string,
  ) {
    const refreshToken = request.cookies.token;

    return this._ChatService.getMessages({
      refreshToken,
      threadId,
    });
  }

  @Post('message/send')
  async sendMessage(
    @Req() request: Request,

    @Body() body: IChatController.SendMessage.Body,
  ) {
    const refreshToken = request.cookies.token;

    return this._ChatService.sendMessage({
      refreshToken,
      data: body,
    });
  }

  @Delete('message/:messageId')
  async deleteMessage(
    @Req() request: Request,

    @Param('messageId') messageId: string,
  ) {
    const refreshToken = request.cookies.token;

    return this._ChatService.deleteMessage({
      refreshToken,
      messageId,
    });
  }
}
