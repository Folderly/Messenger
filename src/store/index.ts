import { AuthAPI } from "@/api/auth";
import { ChatAPI } from "@/api/chat";
import { Contact, CurrentUser, Message } from "@/types/chat";
import { defineStore } from "pinia";
import { remove } from "lodash";

interface State {
  currentUser: CurrentUser | null;
  selectedContact: Contact | null;
  contacts: Contact[];
  messages: Message[];

  loading: boolean;
}

export const useStore = defineStore("main", {
  state: () => {
    return {
      currentUser: null,
      selectedContact: null,
      contacts: [],
      messages: [],

      loading: false,
    } as State;
  },

  actions: {
    async signIn() {
      await AuthAPI.signIn();
    },

    async fetchContacts() {
      const contacts = await ChatAPI.getContacts();

      this.contacts = contacts;
    },

    async fetchMessages() {
      if (!this.selectedContact) return;

      const messages = await ChatAPI.getMessages(this.selectedContact.threadId);

      this.messages = messages;
    },

    async fetchCurrentUser() {
      this.currentUser = await ChatAPI.getCurrentUser();
    },

    async sendMessage(message: string) {
      if (!this.selectedContact) return;

      const newMessage = await ChatAPI.sendMessage({
        subject: "",
        body: message,
        to: this.selectedContact.email,
        threadId: this.selectedContact.threadId,
      });

      this.messages.push(newMessage);
    },

    async deleteMessage(message: Message) {
      await ChatAPI.deleteMessage({ messageId: message.id });

      remove(this.messages, { id: message.id });
    },
  },
});
