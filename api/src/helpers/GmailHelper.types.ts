import { gmail_v1 } from 'googleapis';

export namespace IGmailHelper {
  export enum MimeTypes {
    TextPlain = 'text/plain',
    TextHtml = 'text/html',
  }

  export namespace GetTokens {
    export interface Params {
      code: string;
    }
  }

  export namespace GetCurrentUser {
    export interface Params {
      refreshToken: string;
    }
  }

  export namespace GetMessagesByThreadId {
    export interface Params {
      refreshToken: string;
      threadId: string;
    }
  }

  export namespace GetContacts {
    export interface Params {
      refreshToken: string;
    }

    export interface ContactData {
      threadId: string;
      contact: string;
      lastMessage: gmail_v1.Schema$Message | null;
    }

    export type ReturnValue = Promise<ContactData[]>;
  }

  export namespace SendMessage {
    export interface Params {
      refreshToken: string;

      data: {
        subject: string;
        body: string;
        to: string;
        threadId: string;
        inReplyTo: string;
      };
    }
  }

  export namespace DeleteMessage {
    export interface Params {
      refreshToken: string;
      messageId: string;
    }
  }

  export namespace _GetContactFromThread {
    export interface Params {
      thread: gmail_v1.Schema$Thread;
      userEmail: string;
    }
  }

  export namespace _IsMessageFromCurrentUser {
    export interface Params {
      message: gmail_v1.Schema$Message;
      userEmail: string;
    }
  }
}
