import Block from "../../utils/Block";
import template from "./button.hbs";
import styles from "./button.scss";

interface ButtonProps {
  type?: string;
  label?: string;
  className?: string;
  events: {
    click: (e:Event) => void | undefined;
  };
}

export class Button extends Block<ButtonProps> {
  
  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
