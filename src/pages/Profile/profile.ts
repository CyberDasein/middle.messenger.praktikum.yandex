import Block from "../../utils/Block";
import template from "./profile.hbs";
import { Link } from "../../components/Link";
import styles from "./profile.scss";
import defaultAvatar from "./avatar.png";
import { Input } from "../../components/Input";
import { makeErrorMessage } from "../../utils/makeErrorMessage";
import { validator } from "../../utils/formValidators";

export default class ProfilePage extends Block {
  constructor() {
    super({});
  }
  static isEditable = false;

  init() {
    this.children.inputAvatar = new Input({
      name: "avatar",
      type: "file",
      disabled: "disabled",
    });
    this.children.inputLogin = new Input({
      name: "login",
      type: "text",
      value: "testLogin",
      placeholder: "Логин",
      disabled: "disabled",
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
      value: "test@yandex.ru",
      disabled: "disabled",
      placeholder: "Email",
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
      placeholder: "Имя",
      disabled: "disabled",
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
      disabled: "disabled",
      placeholder: "Фамилия",
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
      placeholder: "Телефон",
      disabled: "disabled",
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
      disabled: "disabled",
      placeholder: "Новый пароль",
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
      disabled: "disabled",
      placeholder: "Повторите новый пароль",
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
    this.children.changeData = new Link({
      className: "link-change-data",
      label: "Изменить данные",
      href: "#",
      events: {
        click: (e) => {
          e.preventDefault();
          ProfilePage.isEditable = !ProfilePage.isEditable;
          this.setEditableFields(ProfilePage.isEditable);
          if (ProfilePage.isEditable) {
            (<HTMLInputElement>e.target).textContent = "Сохранить";
          } else {
            (<HTMLInputElement>e.target).textContent = "Изменить данные";
          }
        },
      },
    });

    this.children.exitProfile = new Link({
      className: "exit",
      label: "Выйти",
      href: "/pages/Chat/chat.html",
    });
  }
  setEditableFields(isEdit: boolean) {
    Object.values(this.children)
      .filter((child) => child instanceof Input)
      .forEach((child) => [(child as Input).setEditable(isEdit)]);
  }
  render() {
    return this.compile(template, { ...this.props, styles, defaultAvatar });
  }
}
