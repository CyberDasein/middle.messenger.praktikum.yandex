import { renderDom } from "./utils/renderDom";
import { LoginPage } from "./pages/Login/index";
import  ChatPage  from "./pages/Chat/chat";
import  RegistrationPage  from "./pages/Registration/registration";
import {ProfilePage} from "./pages/Profile/profile";
import serverErrorPage  from "./pages/500/500";
import  notFoundPage  from "./pages/404/404";
import Router from "./utils/Router";
import AuthController from "./controllers/AuthController";

enum Routes {
  Index = "/",
  Registration = "/registration",
  Profile = "/profile",
  ChatPage = "/chats",
}

document.addEventListener("DOMContentLoaded", async () => {
  Router
    .use(Routes.Index, LoginPage)
    .use(Routes.Registration, RegistrationPage)
    .use(Routes.ChatPage, ChatPage)
    .use(Routes.Profile, ProfilePage);

  let isProtectedRoute = true;

  switch (window.location.pathname) {
    case Routes.Index:
    case Routes.Registration:
      isProtectedRoute = false;
      break;
  }

  try {
    await AuthController.fetchUser();

    Router.start();

    if (!isProtectedRoute) {
      Router.go(Routes.Profile);
    }
  } catch (e) {
    Router.start();

    if (isProtectedRoute) {
      Router.go(Routes.Index);
    }
  }
});
