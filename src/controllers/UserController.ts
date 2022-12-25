import Router from "../utils/Router";
import API, { UserAPI } from "../api/UserAPI";
import { GetUser } from "../interfaces/interfaces";
import AuthController from "./AuthController";

export class UserController {
  private readonly api: UserAPI;

  constructor() {
    this.api = API;
  }

  async getByUserId(id: number) {
    return this.api.getByUserId(id);
  }
  async getByUserLogin(login: string) {
    try {
      return this.api.getByUserLogin(login);
    } catch (e: any) {
      console.error(e);
    }
  }
  async updateAvatar(avatar: FormData) {
    try {
      await this.api.updateAvatar(avatar);
      await AuthController.fetchUser();
    } catch (e: any) {
      console.error(e);
    }
  }

  async updatePassword(data: Record<string, string>) {
    try {
      await this.api.updatePassword(data);
      Router.go("/profile");
    } catch (e: any) {
      console.error(e);
    }
  }

  async updateProfile(data: GetUser) {
    try {
      await this.api.updateProfile(data);
      Router.go("/profile");
    } catch (e: any) {
      console.error(e);
    }
  }
}

export default new UserController();
