import { Credentials } from 'google-auth-library';
import { google, gmail_v1 } from 'googleapis';
import { IChat } from '@/core/chat/types/chat.types';
import { MessageUtils } from '@/utils/MessageUtils';
import { TextUtils } from '@/utils/TextUtils';
import { IGmailHelper } from './GmailHelper.types';

export class GmailHelper {
  static getConsentPageUrl(): string {
    const oauth2Client = GmailHelper._getOauthClient();

    return oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: 'https://www.googleapis.com/auth/gmail.modify',
      prompt: 'consent',
    });
  }

  static async checkRefreshToken(refreshToken?: string) {
    if (!refreshToken) return false;

    try {
      const oauth2Client = GmailHelper._getOauthClient();

      oauth2Client.setCredentials({ refresh_token: refreshToken });

      await oauth2Client.getRequestHeaders();

      return true;
    } catch (error) {
      if (error.response.data.error === 'invalid_grant') return false;

      throw error;
    }
  }

  static async getTokens({
    code,
  }: IGmailHelper.GetTokens.Params): Promise<Credentials> {
    const oauth2Client = GmailHelper._getOauthClient();

    const { tokens } = await oauth2Client.getToken(code);

    return tokens;
  }

  static async getCurrentUser({
    refreshToken,
  }: IGmailHelper.GetCurrentUser.Params): Promise<IChat.CurrentUser> {
    const gmail = GmailHelper._connectToGmail(refreshToken);

    const me = await gmail.users.getProfile({
      userId: 'me',
    });

    return {
      email: me.data.emailAddress,
    };
  }

  static async getMessagesByThreadId({
    refreshToken,
    threadId,
  }: IGmailHelper.GetMessagesByThreadId.Params): Promise<
    gmail_v1.Schema$Message[]
  > {
    const gmail = GmailHelper._connectToGmail(refreshToken);

    const thread = await gmail.users.threads.get({
      userId: 'me',
      id: threadId,
    });

    return GmailHelper._excludeDeletedMessages(thread.data.messages);
  }

  static async getContacts({
    refreshToken,
  }: IGmailHelper.GetContacts.Params): IGmailHelper.GetContacts.ReturnValue {
    const gmail = GmailHelper._connectToGmail(refreshToken);

    const threads = await gmail.users.threads.list({
      userId: 'me',
      maxResults: 20,
    });

    const getThreadsPromises = threads.data.threads.map((thread) =>
      gmail.users.threads.get({ id: thread.id, userId: 'me' }),
    );

    const fullThreads = await Promise.all(getThreadsPromises);

    const currentUserEmail = (await gmail.users.getProfile({ userId: 'me' }))
      .data.emailAddress;

    const getContactsPromises = fullThreads.map(async ({ data: thread }) => {
      const messages = GmailHelper._excludeDeletedMessages(thread.messages);

      const lastMessage = messages.length
        ? (
            await gmail.users.messages.get({
              userId: 'me',
              id: messages[messages.length - 1].id,
            })
          ).data
        : null;

      const contact = GmailHelper._getContactFromThread({
        thread,
        userEmail: currentUserEmail,
      });

      return {
        threadId: thread.id,
        contact,
        lastMessage,
      };
    });

    const contacts = await Promise.all(getContactsPromises);

    return contacts;
  }

  static async sendMessage({
    refreshToken,
    data,
  }: IGmailHelper.SendMessage.Params) {
    const gmail = GmailHelper._connectToGmail(refreshToken);

    const currentUserEmail = (await gmail.users.getProfile({ userId: 'me' }))
      .data.emailAddress;

    const replyToMessage = await gmail.users.messages.get({
      userId: 'me',
      id: data.inReplyTo,
    });

    if (!replyToMessage) throw new Error('Reply to Message not found');
    const replyToMessageId = MessageUtils.findHeaderByName(
      replyToMessage.data.payload.headers,
      'Message-ID',
    );

    const raw = TextUtils.stringToBase64([
      `Content-Type: text/plain; charset="UTF-8"\n`,
      `MIME-Version: 1.0\n`,
      'Content-Transfer-Encoding: 7bit\n',
      `to: ${data.to}\n`,
      `from: ${currentUserEmail}\n`,
      `subject: ${data.subject}\n`,
      `In-Reply-To: ${replyToMessageId.value}\n\n`,
      data.body || '',
    ]);

    const {
      data: { id },
    } = await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw,
        threadId: data.threadId,
      },
    });

    const { data: message } = await gmail.users.messages.get({
      userId: 'me',
      id,
    });

    return message;
  }

  static async deleteMessage({
    refreshToken,
    messageId,
  }: IGmailHelper.DeleteMessage.Params) {
    const gmail = GmailHelper._connectToGmail(refreshToken);

    await gmail.users.messages.trash({ userId: 'me', id: messageId });
  }

  private static _excludeDeletedMessages(messages: gmail_v1.Schema$Message[]) {
    return messages.filter((message) => !message.labelIds.includes('TRASH'));
  }

  private static _getContactFromThread({
    thread,
    userEmail,
  }: IGmailHelper._GetContactFromThread.Params): string | null {
    const userMessage = thread.messages.find((message) =>
      GmailHelper._isMessageFromCurrentUser({ message, userEmail }),
    );

    if (userMessage)
      return MessageUtils.findHeaderByName(userMessage.payload.headers, 'to')
        ?.value;

    const contactMessage = thread.messages.find(
      (message) =>
        !GmailHelper._isMessageFromCurrentUser({ message, userEmail }),
    );

    if (contactMessage)
      return MessageUtils.findHeaderByName(
        contactMessage.payload.headers,
        'from',
      )?.value;

    return null;
  }

  private static _isMessageFromCurrentUser({
    message,
    userEmail,
  }: IGmailHelper._IsMessageFromCurrentUser.Params): boolean {
    const headerValue = MessageUtils.findHeaderByName(
      message.payload.headers,
      'from',
    )?.value;

    return headerValue ? headerValue.includes(userEmail) : false;
  }

  private static _connectToGmail(refreshToken: string): gmail_v1.Gmail {
    const oauth2Client = GmailHelper._getOauthClient();
    oauth2Client.setCredentials({ refresh_token: refreshToken });

    return google.gmail({ version: 'v1', auth: oauth2Client });
  }

  private static _getOauthClient() {
    const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URL } =
      process.env;

    return new google.auth.OAuth2(
      GOOGLE_CLIENT_ID,
      GOOGLE_CLIENT_SECRET,
      GOOGLE_REDIRECT_URL,
    );
  }
}
