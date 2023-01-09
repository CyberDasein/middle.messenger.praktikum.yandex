import Block from "../../utils/Block";
import template from "./registration.hbs";
import { Button } from "../../components/Button";
import { Link } from "../../components/Link";
import { makeErrorMessage } from "../../utils/makeErrorMessage";
import { validator } from "../../utils/formValidators";
import { Input } from "../../components/Input";
import AuthController from "../../controllers/AuthController";
import { RegistryData } from "../../interfaces/interfaces";

export default class RegistrationPage extends Block {
  constructor() {
    super({});
  }
  _onBlurValidate(e: Event) {
    const element = e.target as HTMLInputElement;
    const elementName = element.name;
    const regexp = validator[elementName].re;

    if (!regexp.test(element.value)) {
      makeErrorMessage(element, validator[elementName].message);
    }
  }
  _onFocusValidate(e: Event) {
    const element = e.target as HTMLInputElement;
    const container = element.closest(".form__field");
    const errorMessage = container?.querySelector<HTMLElement>(".error");
    if (errorMessage) {
      errorMessage.style.display = "none";
    }
  }
  init() {
    this.children.button = new Button({
      label: "Зарегистрироваться",
      type: "submit",
      events: {
        click: (e) => {
          e.preventDefault();
          this.onSubmit();
        },
      },
    });

    this.children.link = new Link({
      className: "sign-in-link",
      label: "Войти",
      href: "/",
    });
    this.children.inputLogin = new Input({
      name: "login",
      type: "text",
      events: {
        blur: (e) => this._onBlurValidate(e),
        focus: (e) => this._onFocusValidate(e),
      },
    });
    this.children.inputEmail = new Input({
      name: "email",
      type: "text",
      events: {
        blur: (e) => this._onBlurValidate(e),
        focus: (e) => this._onFocusValidate(e),
      },
    });
    this.children.inputFirstName = new Input({
      name: "first_name",
      type: "text",
      events: {
        blur: (e) => this._onBlurValidate(e),
        focus: (e) => this._onFocusValidate(e),
      },
    });
    this.children.inputSecondName = new Input({
      name: "second_name",
      type: "text",
      events: {
        blur: (e) => this._onBlurValidate(e),
        focus: (e) => this._onFocusValidate(e),
      },
    });
    this.children.inputPhone = new Input({
      name: "phone",
      type: "text",
      events: {
        blur: (e) => this._onBlurValidate(e),
        focus: (e) => this._onFocusValidate(e),
      },
    });
    this.children.inputPassword = new Input({
      name: "password",
      type: "password",
      events: {
        blur: (e) => this._onBlurValidate(e),
        focus: (e) => this._onFocusValidate(e),
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
    AuthController.signup(data as RegistryData);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
