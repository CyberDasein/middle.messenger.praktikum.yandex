import { renderDom } from "../../utils/renderDom";
import notFoundPage from "./../500/500";

document.addEventListener("DOMContentLoaded", () => {
  const page = new notFoundPage();
  renderDom("#serverErrorPage", page);
});
