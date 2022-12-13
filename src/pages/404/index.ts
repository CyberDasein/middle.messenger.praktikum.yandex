import { renderDom } from "../../utils/renderDom";
import notFoundPage from "./../404/404";

document.addEventListener("DOMContentLoaded", () => {
  const page = new notFoundPage();
  renderDom("#notFoundPage", page);
});
