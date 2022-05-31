import { IChat } from '@/core/chat/types/chat.types';
import { gmail_v1 } from 'googleapis';
import { TextUtils } from '@/utils/TextUtils';
import { MessageUtils } from '@/utils/MessageUtils';
import { IGmailHelper } from '@/helpers/GmailHelper.types';

export class GmailMapper {
  static mapToContacts(
    contacts: IGmailHelper.GetContacts.ContactData[],
  ): IChat.Contact[] {
    return contacts.map(({ contact, lastMessage, threadId }) => {
      const splitted = contact.split(' ');

      const email = MessageUtils.removeAngleBrackets(splitted.pop());
      const name = splitted.join(' ').replace(/["']/g, '');

      const mappedMessage = lastMessage
        ? GmailMapper.mapToMessage(lastMessage)
        : null;

      return {
        name,
        email,

        threadId,

        lastMessage: mappedMessage,
      };
    });
  }

  static mapToMessages(messages: gmail_v1.Schema$Message[]): IChat.Message[] {
    return messages.map((message) => GmailMapper.mapToMessage(message));
  }

  static mapToMessage(message: gmail_v1.Schema$Message): IChat.Message {
    const { id, payload } = message;

    const dateHeader =
      MessageUtils.findHeaderByName(payload.headers, 'date')?.value || '';
    const date = dateHeader ? new Date(dateHeader).valueOf() : 0;

    const subject =
      MessageUtils.findHeaderByName(payload.headers, 'subject')?.value || '';

    const from = GmailMapper._getEmailFromHeader(
      MessageUtils.findHeaderByName(payload.headers, 'from')?.value || '',
    );
    const to = GmailMapper._getEmailFromHeader(
      MessageUtils.findHeaderByName(payload.headers, 'to')?.value || '',
    );

    const body = GmailMapper._getBodyFromMessage(payload);
    const contentType = GmailMapper._getContentTypeFromMessage(payload);

    return {
      id,
      subject,
      body,

      date,
      from,
      to,

      contentType,
    };
  }

  private static _getEmailFromHeader(from: string) {
    const splitted = from.split(' ');
    return MessageUtils.removeAngleBrackets(splitted.pop());
  }

  private static _getBodyFromMessage(payload: gmail_v1.Schema$MessagePart) {
    if (payload.body.size)
      return TextUtils.base64ToString(payload.body.data || '');

    const html = GmailMapper._getHtmlFromMultipart(payload);
    const convertedHtml = TextUtils.base64ToString(html || '');

    return convertedHtml;
  }

  private static _getHtmlFromMultipart(
    part: gmail_v1.Schema$MessagePart,
  ): string | null {
    if (part.mimeType === IGmailHelper.MimeTypes.TextHtml)
      return part.body.data;

    if (!part.parts) return null;

    for (let i = 0; i < part.parts.length; i++) {
      const subPart = part.parts[i];

      const html = GmailMapper._getHtmlFromMultipart(subPart);

      if (html) return html;
    }

    return null;
  }

  private static _getContentTypeFromMessage(
    payload: gmail_v1.Schema$MessagePart,
  ) {
    switch (payload.mimeType) {
      case IGmailHelper.MimeTypes.TextPlain:
        return IChat.ContentType.Plain;
      default:
        return IChat.ContentType.Html;
    }
  }
}
