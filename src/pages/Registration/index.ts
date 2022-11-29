import { renderDom } from "../../utils/renderDom";
import RegistrationPage from "./../Registration/registration";

document.addEventListener("DOMContentLoaded", () => {
  const registrationPage = new RegistrationPage();
  renderDom("#registrationPage", registrationPage);
});
