export namespace ISendMessage {
  export interface Body {
    subject: string;
    body: string;
    to: string;

    threadId: string;
    inReplyTo: string;
  }
}

export namespace IDeleteMessage {
  export interface Params {
    messageId: string;
  }
}
