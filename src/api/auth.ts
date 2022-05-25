import { axios } from "@/plugins/axios";

export class AuthAPI {
  static async signIn(): Promise<string> {
    const { redirectUrl } = (await axios.post("auth/sign-in")).data;

    return redirectUrl;
  }

  static async signOut() {
    await axios.post("auth/sign-out");
  }
}
