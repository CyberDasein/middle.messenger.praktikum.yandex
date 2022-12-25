import Block from "../../utils/Block";
import template from "./404.hbs";
import styles from "./404.scss";

export default class NotFoundPage extends Block {
  constructor() {
    super({});
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
