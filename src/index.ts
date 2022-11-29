import { renderDom } from "./utils/renderDom";
import { LoginPage } from "./pages/Login/index";

document.addEventListener("DOMContentLoaded", () => {
  const loginPage = new LoginPage();
  renderDom("#app", loginPage);
});
