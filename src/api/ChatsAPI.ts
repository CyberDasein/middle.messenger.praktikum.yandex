import BaseAPI from "./BaseAPI";
import { GetUser, ChatInfo, DeleteUsersInt } from "../interfaces/interfaces";

export class ChatsAPI extends BaseAPI {
  constructor() {
    super("/chats");
  }

  create(title: string) {
    return this.http.post("/", { title });
  }

  delete(id: number): Promise<unknown> {
    return this.http.delete("/", { chatId: id });
  }

  read(): Promise<ChatInfo[]> {
    return this.http.get("/");
  }

  getUsers(id: number): Promise<Array<GetUser & { role: string }>> {
    return this.http.get(`/${id}/users`);
  }

  addUsers(id: number, users: number[]): Promise<unknown> {
    return this.http.put("/users", { users, chatId: id });
  }

  removeUsersFromChat(users: DeleteUsersInt): Promise<unknown> {
    return this.http.delete("/users", users);
  }

  async getToken(id: number): Promise<string> {
    const response = await this.http.post<{ token: string }>(`/token/${id}`);

    return response.token;
  }

  update = undefined;
}

export default new ChatsAPI();
