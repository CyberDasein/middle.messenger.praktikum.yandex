import Block from "../../utils/Block";
import template from "./500.hbs";
import styles from "./500.scss";

export default class serverErrorPage extends Block {
  constructor() {
    super({});
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
