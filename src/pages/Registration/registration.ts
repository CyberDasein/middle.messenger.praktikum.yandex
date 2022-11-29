import Block from "../../utils/Block";
import template from "./registration.hbs";
import { Button } from "../../components/Button";
import { Link } from "../../components/Link";
import { makeErrorMessage } from "../../utils/makeErrorMessage";
import { validator } from "../../utils/formValidators";
import { Input } from "../../components/Input";

export default class RegistrationPage extends Block {
  constructor() {
    super({});
  }

  init() {
    this.children.button = new Button({
      label: "Зарегистрироваться",
      type: "submit",
      events: {
        click: () => this.onSubmit(),
      },
    });

    this.children.link = new Link({
      className: "sign-in-link",
      label: "Войти",
      href: "/index.html",
    });
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
    this.children.inputEmail = new Input({
      name: "email",
      type: "text",
      events: {
        blur: (e) => {
          const regexp = validator.email.re;

          if (!regexp.test((<HTMLInputElement>e.target).value)) {
            makeErrorMessage(e.target, validator.email.message);
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
    this.children.inputFirstName = new Input({
      name: "first_name",
      type: "text",
      events: {
        blur: (e) => {
          const regexp = validator.first_name.re;

          if (!regexp.test((<HTMLInputElement>e.target).value)) {
            makeErrorMessage(e.target, validator.first_name.message);
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
    this.children.inputSecondName = new Input({
      name: "second_name",
      type: "text",
      events: {
        blur: (e) => {
          const regexp = validator.second_name.re;

          if (!regexp.test((<HTMLInputElement>e.target).value)) {
            makeErrorMessage(e.target, validator.second_name.message);
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
    this.children.inputPhone = new Input({
      name: "phone",
      type: "text",
      events: {
        blur: (e) => {
          const regexp = validator.phone.re;

          if (!regexp.test((<HTMLInputElement>e.target).value)) {
            makeErrorMessage(e.target, validator.phone.message);
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
    this.children.inputRepeatPassword = new Input({
      name: "repeatPassword",
      type: "password",
      events: {
        blur: (e) => {
          const inputPassword = this.children.inputPassword as Input;
          if ((<HTMLInputElement>e.target).value !== inputPassword.getValue()) {
            makeErrorMessage(e.target, "Пароли не совпадают");
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
  }

  onSubmit() {
    const values = Object.values(this.children)
      .filter((child) => child instanceof Input)
      .map((child) => [
        (child as Input).getName(),
        (child as Input).getValue(),
      ]);
    const data = Object.fromEntries(values);
    console.log(data);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
