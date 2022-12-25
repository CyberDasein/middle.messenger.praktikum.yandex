import Block from "../../utils/Block";
import template from "./settings.hbs";
import styles from "./settings.scss";
import { Button } from "../Button/index";
import ChatsController from "../../controllers/ChatController";
import { ChatProps, withSelectedChat } from "../UserChat";
import UserController from "../../controllers/UserController";
import { GetUser } from '../../interfaces/interfaces';

interface SettingsProps {
  selectedChat: ChatProps;
  events: {
    click: (e: Event) => void | undefined;
  };
}

class SettingsBase extends Block<SettingsProps> {
  constructor(props: SettingsProps) {
    super({
      ...props,
    });
  }
  init() {
    this.children.toggleBtn = new Button({
      events: {
        click: this.props.events.click,
      },
    });
    this.children.addUser = new Button({
      className: "settings__action action-add-user",
      label: "Добавить пользователя",
      events: {
        click: (e) => {
          if (!this.props.selectedChat) {
            alert("Выберите чат, в который хотите добавить");
            return;
          }
          const userLogin = prompt("Введите логин пользователя");
          if (userLogin) {
            this.addToChat(userLogin);
          } else {
            alert("Вы ничего не ввели");
          }
        },
      },
    });
    this.children.removeUser = new Button({
      className: "settings__action action-add-user",
      label: "Удалить пользователя",
      events: {
        click: (e) => {
          if (!this.props.selectedChat) {
            alert("Выберите чат");
            return;
          }
          const userLogin = prompt("Введите логин пользователя");
          if (userLogin) {
            this.removeUsersFromChat(userLogin);
          } else {
            alert("Вы ничего не ввели");
          }
        },
      },
    });
  }
  async addToChat(userLogin: string) {
    const userData : GetUser[] = await UserController.getByUserLogin(userLogin);

    if (userData[0]) {
      ChatsController.addUserToChat(this.props.selectedChat.id, userData[0].id);
    } else {
      alert("Пользователь не найден")
    }
  }
  async removeUsersFromChat(userLogin: string) {
    const userData : GetUser[] = await UserController.getByUserLogin(userLogin);

    if (userData[0]) {
      ChatsController.removeUsersFromChat({ users: [userData[0].id], chatId: this.props.selectedChat.id});
    } else {
      alert("Пользователь не найден")
    }
  }
  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
export const Settings = withSelectedChat(SettingsBase);
