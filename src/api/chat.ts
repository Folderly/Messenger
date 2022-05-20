import { axios } from "@/plugins/axios";
import { Contact, CurrentUser, Message } from "@/types/chat";
import { IDeleteMessage, ISendMessage } from "./chat.types";

export class ChatAPI {
  static async getContacts(): Promise<Contact[]> {
    return (await axios.get("chat/contacts")).data;
  }

  static async getMessages(threadId: string): Promise<Message[]> {
    return (await axios.get(`chat/messages?threadId=${threadId}`)).data;
  }

  static async getCurrentUser(): Promise<CurrentUser> {
    return (await axios.get(`chat/current-user`)).data;
  }

  static async sendMessage(data: ISendMessage.Body) {
    return (await axios.post("chat/message/send", data)).data;
  }

  static async deleteMessage({ messageId }: IDeleteMessage.Params) {
    await axios.delete(`chat/message/${messageId}`);
  }
}
