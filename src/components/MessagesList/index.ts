import Block from "../../utils/Block";
import template from "./messagesList.hbs";
import { Message } from "../Message";
import { Message as MessageInterface } from "../../interfaces/interfaces";
import MessagesController from "../../controllers/MessagesController";
import { withStore } from "../../utils/Store";
import { Button } from "../Button";
import { Input } from "../Input";
import { makeErrorMessage } from "../../utils/makeErrorMessage";
import { validator } from "../../utils/formValidators";

interface MessengerProps {
  selectedChat: number | undefined;
  messages: MessageInterface[];
  userId: number;
}

class MessengerBase extends Block<MessengerProps> {
  constructor(props: MessengerProps) {
    super(props);
  }
  protected init() {
    this.children.messages = this.createMessages(this.props);

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
        keyup: (e) => {
          if (e.keyCode === 13) {
            const input: any = document.querySelector("#message");
            const inputMessage = this.children.inputMessage as Input;
            const message = inputMessage.getValue();

            if (message !== "") {
              MessagesController.sendMessage(this.props.selectedChat!, message);
              input.value = "";
            }
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
          const input: any = document.querySelector("#message");
          const inputMessage = this.children.inputMessage as Input;
          const message = inputMessage.getValue();

          if (message !== "") {
            MessagesController.sendMessage(this.props.selectedChat!, message);
            input.value = "";
          }
        },
      },
    });
  }

  protected componentDidUpdate(
    oldProps: MessengerProps,
    newProps: MessengerProps
  ): boolean {
    this.children.messages = this.createMessages(newProps);

    return true;
  }

  private createMessages(props: MessengerProps) {
    return props.messages.map((data) => {
      return new Message({ ...data, isMine: props.userId === data.user_id });
    });
  }

  protected render(): DocumentFragment {
    return this.compile(template, { ...this.props });
  }
}

const withSelectedChatMessages = withStore((state) => {
  const selectedChatId = state.selectedChat;

  if (!selectedChatId) {
    return {
      messages: [],
      selectedChat: undefined,
      userId: state.user.id
    };
  }

  return {
    messages: (state.messages || {})[selectedChatId] || [],
    selectedChat: state.selectedChat,
    userId: state.user.id
  };
});

export const MessagesList = withSelectedChatMessages(MessengerBase);
