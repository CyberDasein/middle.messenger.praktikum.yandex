import Block from "../../utils/Block";
import template from "./settings.hbs";
import styles from "./settings.scss";
import { Button } from "../Button/index";

interface SettingsProps {
  events: {
    click: (e: Event) => void | undefined;
  };
}

export class Settings extends Block<SettingsProps> {
  constructor(props: SettingsProps) {
    super({
      ...props,
    });
  }
  init() {
    this.children.toggleBtn = new Button({
      events: {
        click:  this.props.events.click
      }
    });
  }
  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
