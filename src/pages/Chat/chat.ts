import Block from "../../utils/Block";
import template from "./../Chat/chat.hbs";
import { Link } from "../../components/Link";
import { User } from "../../components/User";
import styles from "./chat.scss";
import { Message } from "../../components/Message";
import ChatsController from "../../controllers/ChatController"
import { Settings } from "../../components/Settings/index";
import { Input } from "../../components/Input";
import { validator } from "../../utils/formValidators";
import { makeErrorMessage } from "../../utils/makeErrorMessage";
import { Button } from "../../components/Button";
import MessagesController from "../../controllers/MessagesController";
import { withStore } from "../../utils/Store";
import { ChatsListProps, MessengerProps } from "../../interfaces/interfaces";
import { Chat } from "../../components/UserChat";
import { ChatsList } from "../../components/ChatList";
import { MessagesList } from "../../components/MessagesList";

export default class ChatPageBase extends Block {
  constructor() {
    super({});
  }

  init() {
    console.log(this.props)
 
    this.children.usersDialogs = new ChatsList({ isLoaded: false });
    this.children.myMessages = new MessagesList({});

    ChatsController.fetchChats()
  
    this.children.linkToProfile = new Link({
      className: "link-to-profile",
      label: "Профиль",
      href: "/pages/Profile/profile.html",
    });

    this.children.settings = new Settings({
      events: {
        click: () => {
          document.querySelector(".settings")?.classList.toggle("active");
        },
      },
    });
  }


  render() {
    return this.compile(template, { ...this.props, styles });
  }
}

