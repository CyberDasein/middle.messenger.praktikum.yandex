import { RegistryData, AuthData, GetUser } from "../interfaces/interfaces";
import BaseAPI from "./BaseApi";


export class AuthAPI extends BaseAPI {
  constructor() {
    super('/auth');
  }

  signin(data: AuthData) {
    return this.http.post('/signin', data);
  }


  signup(data: RegistryData) {
    return this.http.post('/signup', data);
  }

  read(): Promise<GetUser> {
    return this.http.get('/user');
  }

  logout() {
    return this.http.post('/logout');
  }

  create = undefined;
  update = undefined;
  delete = undefined;
}

export default new AuthAPI();
