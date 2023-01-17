import Block from "../../utils/Block";
import { validator } from "../../utils/formValidators";
import template from "./login.hbs";
import { Button } from "../../components/Button";
import { Link } from "../../components/Link";
import styles from "./login.scss";
import { Input } from "../../components/Input/index";
import { makeErrorMessage } from "../../utils/makeErrorMessage";
import AuthController from "../../controllers/AuthController";
import { AuthData } from "../../interfaces/interfaces";

export class LoginPage extends Block {
  constructor() {
    super({});
  }

  init() {
    this.children.inputLogin = new Input({
      name: "login",
      type: "text",
      events: {
        blur: (e) => {
          const regexp = validator.login.re;

          if (!regexp.test((<HTMLInputElement>e.target).value)) {
            makeErrorMessage(e.target, validator.login.message);
          }
        },
        focus: (e) => {
          const container = (<HTMLInputElement>e.target).closest(
            ".form__field"
          );
          const errorMessage = container?.querySelector<HTMLElement>(".error");
          if (errorMessage) {
            errorMessage.style.display = "none";
          }
        },
      },
    });
    this.children.inputPassword = new Input({
      name: "password",
      type: "password",
      events: {
        blur: (e) => {
          const regexp = validator.password.re;

          if (!regexp.test((<HTMLInputElement>e.target).value)) {
            makeErrorMessage(e.target, validator.password.message);
          }
        },
        focus: (e) => {
          const container = (<HTMLInputElement>e.target).closest(
            ".form__field"
          );
          const errorMessage = container?.querySelector<HTMLElement>(".error");
          if (errorMessage) {
            errorMessage.style.display = "none";
          }
        },
      },
    });
    this.children.button = new Button({
      label: "Авторизоваться",
      type: "submit",
      events: {
        click: (e) => {
          e.preventDefault();
          this.onSubmit();
        },
      },
    });

    this.children.link = new Link({
      className: "no-acc-link",
      label: "Нет аккаунта?",
      href: "/sign-up",
    });
  }
  onSubmit() {
    const values = Object.values(this.children)
      .filter((child) => child instanceof Input)
      .map((child) => [
        (child as Input).getName(),
        (child as Input).getValue(),
      ]);
    const data = Object.fromEntries(values);
    AuthController.signin(data as AuthData);
  }
  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
