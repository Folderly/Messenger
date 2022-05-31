import { gmail_v1 } from 'googleapis';

export class MessageUtils {
  static findHeaderByName(
    headers: gmail_v1.Schema$MessagePartHeader[],
    name: string,
  ) {
    return headers.find(
      (header) => header.name.toLowerCase() === name.toLowerCase(),
    );
  }

  static removeAngleBrackets(string: string) {
    return string.replace(/[<\>"]/g, '');
  }
}
