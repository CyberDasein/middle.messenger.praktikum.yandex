import { RegistryData, AuthData } from "../interfaces/interfaces";
import API, { AuthAPI } from "../api/AuthAPI";
import Router from "../utils/Router";
import store from "../utils/Store";

export class AuthController {
  private readonly api: AuthAPI;

  constructor() {
    this.api = API;
  }

  async signin(data: AuthData) {
    try {
      await this.api.signin(data);

      await this.fetchUser();

      Router.go("/messenger");
    } catch (e: any) {
      console.error(e);
    }
  }

  async signup(data: RegistryData) {
    try {
      await this.api.signup(data);

      await this.fetchUser();

      Router.go("/messenger");
    } catch (e: any) {
      console.error(e.message);
    }
  }

  async fetchUser() {
    const user = await this.api.read();

    store.set("user", user);
  }

  async logout() {
    try {
      await this.api.logout();

      Router.go("/");
    } catch (e: any) {
      console.error(e.message);
    }
  }
}

export default new AuthController();
