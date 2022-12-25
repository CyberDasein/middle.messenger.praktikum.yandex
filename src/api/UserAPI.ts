import BaseAPI from "./BaseAPI";
import { GetUser } from "../interfaces/interfaces";

export class UserAPI extends BaseAPI {
  constructor() {
    super("/user");
  }

  read(): Promise<GetUser> {
    return this.http.get("/profile");
  }

  getByUserId(id: number) {
    return this.http.get(`/${id}`);
  }
  getByUserLogin(login: string) {
    return this.http.post("/search", { login });
  }
  updateAvatar(avatar: FormData) {
    return this.http.put("/profile/avatar", avatar);
  }

  updatePassword(data: Record<string, string>) {
    return this.http.put("/password", data);
  }

  updateProfile(data: GetUser) {
    return this.http.put("/profile", data);
  }

  create = undefined;
  update = undefined;
  delete = undefined;
}

export default new UserAPI();
