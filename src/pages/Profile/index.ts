import Block from "../../utils/Block";
import template from "./profile.hbs";
import styles from "./profile.scss";
import defaultAvatar from "./avatar.png";
import { Input } from "../../components/Input";
import { makeErrorMessage } from "../../utils/makeErrorMessage";
import { validator } from "../../utils/formValidators";
import AuthController from "../../controllers/AuthController";
import { Button } from "../../components/Button/index";
import { GetUser } from "../../interfaces/interfaces";
import { withUser } from "../../utils/Store";
import UserController from "../../controllers/UserController";
import Router from "../../utils/Router";

class ProfilePageBase extends Block {
  constructor(props: GetUser) {
    super({ ...props });
  }
  static isEditable = false;

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
    const container = element.closest(".profile__el");
    const errorMessage = container?.querySelector<HTMLElement>(".error");
    if (errorMessage) {
      errorMessage.style.display = "none";
    }
  }

  init() {
    AuthController.fetchUser();

    this.children.inputAvatar = new Input({
      name: "avatar",
      type: "file",
      disabled: "disabled",
    });
    this.children.inputLogin = new Input({
      name: "login",
      type: "text",
      value: this.props.login,
      placeholder: "Логин",
      disabled: "disabled",
      events: {
        blur: (e) => this._onBlurValidate(e),
        focus: (e) => this._onFocusValidate(e),
      },
    });
    this.children.inputEmail = new Input({
      name: "email",
      type: "text",
      value: this.props.email,
      disabled: "disabled",
      placeholder: "Email",
      events: {
        blur: (e) => this._onBlurValidate(e),
        focus: (e) => this._onFocusValidate(e),
      },
    });
    this.children.inputFirstName = new Input({
      name: "first_name",
      type: "text",
      placeholder: "Имя",
      value: this.props.first_name,
      disabled: "disabled",
      events: {
        blur: (e) => this._onBlurValidate(e),
        focus: (e) => this._onFocusValidate(e),
      },
    });
    this.children.inputSecondName = new Input({
      name: "second_name",
      type: "text",
      disabled: "disabled",
      value: this.props.second_name,
      placeholder: "Фамилия",
      events: {
        blur: (e) => this._onBlurValidate(e),
        focus: (e) => this._onFocusValidate(e),
      },
    });
    this.children.inputdisplayName = new Input({
      name: "display_name",
      type: "text",
      disabled: "disabled",
      value: this.props.display_name,
      placeholder: "Никнейм",
      events: {
        blur: (e) => this._onBlurValidate(e),
        focus: (e) => this._onFocusValidate(e),
      },
    });
    this.children.inputPhone = new Input({
      name: "phone",
      type: "text",
      placeholder: "Телефон",
      disabled: "disabled",
      value: this.props.phone,
      events: {
        blur: (e) => this._onBlurValidate(e),
        focus: (e) => this._onFocusValidate(e),
      },
    });
    this.children.inputOldPassword = new Input({
      name: "oldPassword",
      type: "password",
      disabled: "disabled",
      placeholder: "Старый пароль",
      events: {
        blur: (e) => this._onBlurValidate(e),
        focus: (e) => this._onFocusValidate(e),
      },
    });
    this.children.inputPassword = new Input({
      name: "newPassword",
      type: "password",
      disabled: "disabled",
      placeholder: "Новый пароль",
      events: {
        blur: (e) => this._onBlurValidate(e),
        focus: (e) => this._onFocusValidate(e),
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
        focus: (e) => this._onFocusValidate(e),
      },
    });
    this.children.changeData = new Button({
      className: "link-change-data",
      label: "Изменить данные",
      type: "button",
      events: {
        click: (e) => {
          ProfilePage.isEditable = !ProfilePage.isEditable;
          this.setEditableFields(ProfilePage.isEditable);
          if (ProfilePage.isEditable) {
            // @ts-ignore
            this.children.changeData.hide();
            // @ts-ignore
            this.children.putUserData.show();
          }
        },
      },
    });
    this.children.putUserData = new Button({
      className: "link-change-data",
      label: "Сохранить",
      type: "submit",
      events: {
        click: (e) => {
          if (ProfilePage.isEditable) {
            e.preventDefault();
            // @ts-ignore
            this.children.changeData.show();
            // @ts-ignore
            this.children.putUserData.hide();
            this.setEditableFields(false);
            this.onSave();
          }
        },
      },
    });
    this.children.backButton = new Button({
      className: "back-btn",
      type: "button",
      events: {
        click: (e) => {
          Router.go("/messenger");
        },
      },
    });
    this.children.putUserData.hide();
    this.children.exitProfile = new Button({
      className: "exit",
      label: "Выйти",
      events: {
        click: (e) => {
          e.preventDefault();
          AuthController.logout();
        },
      },
    });
  }
  onSave() {
    const values = Object.values(this.children)
      .filter((child) => child instanceof Input)
      .map((child) => [
        (child as Input).getName(),
        (child as Input).getValue(),
      ]);
    const data = Object.fromEntries(values);

    const {
      first_name,
      second_name,
      display_name,
      login,
      email,
      phone,
      oldPassword,
      newPassword,
      avatar,
    } = data;
    UserController.updateProfile({
      first_name,
      second_name,
      display_name,
      login,
      email,
      phone,
    } as GetUser);
    if (oldPassword && newPassword) {
      UserController.updatePassword({ oldPassword, newPassword });
    }
    if (avatar) {
      this.changeAvatar();
    }
  }
  changeAvatar() {
    const formData = new FormData();
    const input = document.querySelector("#avatar");
    // @ts-ignore
    formData.append("avatar", input?.files[0]);
    UserController.updateAvatar(formData);
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

export const ProfilePage = withUser(ProfilePageBase);
