export namespace IChatController {
  export namespace SendMessage {
    export interface Body {
      subject: string;
      body: string;
      to: string;

      threadId: string;
      inReplyTo: string;
    }
  }
}
