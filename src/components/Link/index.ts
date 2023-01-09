import { withRouter } from "../../hocs/withRouter";
import Block from "../../utils/Block";
import template from "./link.hbs";
import styles from "./link.scss";

interface LinkProps {
  router: any;
  className?: string;
  href: string;
  label: string;
  events?: {
    click: (e: Event) => void;
  };
}

class BaseLink extends Block<LinkProps> {
  constructor(props: LinkProps) {
    super({
      ...props,
      events: {
        click: (e) => {
          e.preventDefault()
          this.navigate()
        } 
      }
    });
  }
  navigate() {
    this.props.router.go(this.props.href);
  }
  render() {
    return this.compile(template, { ...this.props, styles });
  }
}

export const Link = withRouter(BaseLink)
