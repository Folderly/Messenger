import { Injectable } from '@nestjs/common';
import { GmailHelper } from '@/helpers/GmailHelper';
import { GmailMapper } from '@/mappers/GmailMapper';
import { IChatService } from './types/chat.service.types';
import { IChat } from './types/chat.types';

@Injectable()
export class ChatService {
  async getCurrentUser(
    params: IChatService.GetCurrentUser.Params,
  ): Promise<IChat.CurrentUser> {
    return GmailHelper.getCurrentUser(params);
  }

  async getContacts(
    params: IChatService.GetContacts.Params,
  ): Promise<IChat.Contact[]> {
    const contacts = await GmailHelper.getContacts(params);

    return GmailMapper.mapToContacts(contacts);
  }

  async getMessages(
    params: IChatService.GetMessages.Params,
  ): Promise<IChat.Message[]> {
    const messages = await GmailHelper.getMessagesByThreadId(params);

    return GmailMapper.mapToMessages(messages);
  }

  async sendMessage(params: IChatService.SendMessage.Params) {
    const message = await GmailHelper.sendMessage(params);

    return GmailMapper.mapToMessage(message);
  }

  async deleteMessage(params: IChatService.DeleteMessage.Params) {
    await GmailHelper.deleteMessage(params);
  }
}
