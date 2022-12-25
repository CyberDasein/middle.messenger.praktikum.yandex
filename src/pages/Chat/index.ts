import Block from "../../utils/Block";
import template from "./../Chat/chat.hbs";
import { Link } from "../../components/Link";
import { User } from "../../components/User";
import styles from "./chat.scss";
import ChatsController from "../../controllers/ChatController";
import { Settings } from "../../components/Settings/index";
import { GetUser } from "../../interfaces/interfaces";
import { ChatsList } from "../../components/ChatList";
import { MessagesList } from "../../components/MessagesList";
import { withUser } from "../../utils/Store";
import Router from "../../utils/Router";

class ChatPageBase extends Block {
  constructor(props: GetUser) {
    super({ ...props });
  }

  init() {

    this.children.usersDialogs = new ChatsList({ isLoaded: false });
    this.children.myMessages = new MessagesList({});

    ChatsController.fetchChats();

    this.children.linkToProfile = new Link({
      className: "link-to-profile",
      label: "Профиль",
      href: "/profile",
    });
    this.children.user = new User({
      name: this.props.first_name,
      avatar: this.props.avatar,
      className: "align-center",
      events: {
        click: () => {
          Router.go("/profile")
        },
      },
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
export const ChatPage = withUser(ChatPageBase);
