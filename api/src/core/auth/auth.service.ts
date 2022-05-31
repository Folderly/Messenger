import { Injectable } from '@nestjs/common';
import { GmailHelper } from '@/helpers/GmailHelper';

@Injectable()
export class AuthService {
  async signIn(): Promise<string> {
    return GmailHelper.getConsentPageUrl();
  }

  async finishSignIn(code: string): Promise<string> {
    const tokens = await GmailHelper.getTokens({ code });

    return tokens.refresh_token;
  }
}
