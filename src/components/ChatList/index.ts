import Block from "../../utils/Block";
import template from "./chatList.hbs";
import { Chat } from "../UserChat";
import { withStore } from "../../utils/Store";
import ChatsController from "../../controllers/ChatController";
import { ChatInfo } from "../../interfaces/interfaces";
import { Button } from "../Button/index";

interface ChatsListProps {
  userId: number;
  chats: ChatInfo[];
  isLoaded: boolean;
}

class ChatsListBase extends Block<ChatsListProps> {
  constructor(props: ChatsListProps) {
    super({ ...props });
  }

  protected init() {
    this.children.chats = this.createChats(this.props);

    this.children.addToChat = new Button({
      label: "Добавить чат",
      type: "button",
      events: {
        click: (e) => {
          const title = prompt("Введите название чата");
          ChatsController.create(title as string);
        },
      },
    });
  }

  protected componentDidUpdate(
    oldProps: ChatsListProps,
    newProps: ChatsListProps
  ): boolean {
    this.children.chats = this.createChats(newProps);

    return true;
  }

  private createChats(props: ChatsListProps) {
    return props.chats.map((data) => {
      return new Chat({
        ...data,
        events: {
          click: () => {
            ChatsController.selectChat(data.id);
          },
        },
      });
    });
  }

  protected render(): DocumentFragment {
    return this.compile(template, { ...this.props });
  }
}

const withChats = withStore((state) => ({ chats: [...(state.chats || [])] }));

export const ChatsList = withChats(ChatsListBase as any);
