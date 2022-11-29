import Block from "../../utils/Block";
import template from "./user.hbs";
import styles from "./user.scss";

interface UserProps {
  avatar?: string;
  text?: string;
  name: string;
  date?: string;
  className?: string;
  events?: {
    click?: () => void | undefined;
  };
}

export class User extends Block<UserProps> {
  constructor(props: UserProps) {
    super({
      ...props,
    });
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
