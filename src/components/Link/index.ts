import Block from "../../utils/Block";
import template from "./link.hbs";
import styles from "./link.scss";

interface LinkProps {
  className?: string;
  href: string;
  label: string;
  events?: {
    click: (e: Event) => void;
  };
}

export class Link extends Block<LinkProps> {
  constructor(props: LinkProps) {
    super({
      ...props,
    });
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}