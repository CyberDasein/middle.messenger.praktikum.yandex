import API, { ChatsAPI } from "../api/ChatsAPI";
import { DeleteUsersInt } from "../interfaces/interfaces";
import store from "../utils/Store";
import MessagesController from "./MessagesController";

class ChatsController {
  private readonly api: ChatsAPI;

  constructor() {
    this.api = API;
  }

  async create(title: string) {
    await this.api.create(title);

    this.fetchChats();
  }

  async fetchChats() {
    const chats = await this.api.read();

    chats.map(async (chat) => {
      const token = await this.getToken(chat.id);

      await MessagesController.connect(chat.id, token);
    });

    store.set("chats", chats);
  }

  addUserToChat(id: number, userId: number) {
    this.api.addUsers(id, [userId]);
  }

  addChatAvatar(id: number, avatar: FormData) {
    this.api.addChatAvatar(id, avatar);
  }

  removeUsersFromChat(users : DeleteUsersInt) {
    this.api.removeUsersFromChat(users);
  }

  async delete(id: number) {
    await this.api.delete(id);

    this.fetchChats();
  }

  getToken(id: number) {
    return this.api.getToken(id);
  }

  selectChat(id: number) {
    store.set("selectedChat", id);
  }
}

const controller = new ChatsController();

export default controller;
