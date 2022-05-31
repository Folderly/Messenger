export namespace IChat {
  export interface CurrentUser {
    email: string;
  }

  export interface Contact {
    name: string;
    email: string;

    threadId: string;
    lastMessage: Message | null;
  }

  export interface Message {
    id: string;

    subject: string;
    body: string;

    date: number;
    from: string;
    to: string;

    contentType: ContentType;
  }

  export enum ContentType {
    Plain = 'plain',
    Html = 'html',
  }
}
