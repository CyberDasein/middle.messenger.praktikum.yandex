import Block from "../../utils/Block";
import template from "./userChat.hbs";
import styles from "./userChat.scss";
import { withStore } from "../../utils/Store";
import { ChatInfo } from "../../interfaces/interfaces";
import { Button } from "../Button";
import ChatsController from '../../controllers/ChatController';

export interface ChatProps {
  last_message: Record<string, string>;
  id: number;
  title: string;
  unread_count: number;
  selectedChat: ChatInfo;
  events: {
    click: () => void;
  };
}

class ChatBase extends Block<ChatProps> {
  constructor(props: ChatProps) {
    super(props);
  }

  init() {
    this.children.deleteChat = new Button({
      type: "button",
      className: "delete",
      title: "Удалить чат",
      events: {
        click: (e) => {
          this.deleteChat()
        },
      },
    });
  }
  deleteChat() {
    if(this.props.id === this.props.selectedChat?.id) {
      ChatsController.delete(this.props.id)
    }
  }
  render(): DocumentFragment {

    let time = this.props.last_message?.time;
    if (time !== undefined) {
      time = new Date(time).toString().substring(0, 15);
    }
    return this.compile(template, {
      ...this.props,
      isSelected: this.props.id === this.props.selectedChat?.id,
      styles,
      time,
      deleteChat: this.deleteChat
    });
  }
}

export const withSelectedChat = withStore((state) => ({
  selectedChat: (state.chats || []).find(({ id }) => id === state.selectedChat),
}));

export const Chat = withSelectedChat(ChatBase);
