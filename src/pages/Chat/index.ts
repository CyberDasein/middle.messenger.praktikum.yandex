import { renderDom } from "../../utils/renderDom";
import ChatPage from "../Chat/chat";

document.addEventListener("DOMContentLoaded", () => {
  const chatPage = new ChatPage();
  renderDom("#chatPage", chatPage);
});
