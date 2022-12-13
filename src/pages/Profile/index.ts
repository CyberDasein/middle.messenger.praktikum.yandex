import { renderDom } from "../../utils/renderDom";
import ProfilePage from "./../Profile/profile";

document.addEventListener("DOMContentLoaded", () => {
  const profilePage = new ProfilePage();
  renderDom("#profilePage", profilePage);
});
