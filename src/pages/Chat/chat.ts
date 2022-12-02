import Block from "../../utils/Block";
import template from "./../Chat/chat.hbs";
import { Link } from "../../components/Link";
import { User } from "../../components/User";
import styles from "./chat.scss";
import { Message } from "../../components/Message";
import { Settings } from "../../components/Settings/index";
import { Input } from "../../components/Input";
import { validator } from "../../utils/formValidators";
import { makeErrorMessage } from "../../utils/makeErrorMessage";
import { Button } from "../../components/Button";

export default class ChatPage extends Block {
  constructor() {
    super({});
  }

  init() {
    this.children.usersDialogs = [];
    this.children.myMessages = [];

    this.children.user = new User({
      name: "Alexey",
      className: "align-center",
      events: {
        click: () => {
          location.href = "/pages/Profile/profile.html";
        },
      },
    });
    for (let i = 0; i < 5; i++) {
      this.children.usersDialogs.push(
        new User({
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae, omnis aut!",
          name: "Alexey",
          date: "12:05",
        })
      );
    }
     for (let i = 0; i < 5; i++) {
      this.children.myMessages.push(
        new Message({
          message: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
        })
      );
    }
    this.children.linkToProfile = new Link({
      className: "link-to-profile",
      label: "Профиль",
      href: "/pages/Profile/profile.html",
    });
    this.children.inputMessage = new Input({
      name: "message",
      placeholder: "Сообщение",
      type: "text",
      events: {
        blur: (e) => {
          const isValid = (<HTMLInputElement>e.target).value !== "";

          if (!isValid) {
            makeErrorMessage(e.target, validator.message.message);
          }
        },
        focus: (e) => {
          const container = (<HTMLInputElement>e.target).closest(
            ".message-field"
          );
          const errorMessage = container?.querySelector<HTMLElement>(".error");
          if (errorMessage) {
            errorMessage.style.display = "none";
          }
        },
      },
    });
    this.children.button = new Button({
      type: "submit",
      className: "send",
      events: {
        click: (e) => {
          e.preventDefault();
          this.sendMessage();
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
  sendMessage() {
    const userMessage = (this.children.inputMessage as Input).getValue()
    console.log(userMessage)
  }
  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
