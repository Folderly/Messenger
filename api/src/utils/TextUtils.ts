export class TextUtils {
  static base64ToString(base64String: string) {
    return Buffer.from(base64String, 'base64').toString();
  }

  static stringToBase64(strings: string[]) {
    return Buffer.from(strings.join(''))
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
  }
}
