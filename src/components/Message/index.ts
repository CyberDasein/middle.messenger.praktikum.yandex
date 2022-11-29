import Block from "../../utils/Block";
import template from "./message.hbs";
import styles from "./message.scss";

interface MessageProps {
  message: string;
}

export class Message extends Block<MessageProps> {
  constructor(props: MessageProps) {
    super({
      ...props,
    });
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
