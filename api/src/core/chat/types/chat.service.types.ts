export namespace IChatService {
  export namespace GetCurrentUser {
    export interface Params {
      refreshToken: string;
    }
  }

  export namespace GetContacts {
    export interface Params {
      refreshToken: string;
    }
  }

  export namespace GetMessages {
    export interface Params {
      refreshToken: string;

      threadId: string;
    }
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
}
