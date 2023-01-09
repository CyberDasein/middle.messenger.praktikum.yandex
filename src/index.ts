import { LoginPage } from "./pages/Login/index";
import { ChatPage } from "./pages/Chat";
import RegistrationPage from "./pages/Registration";
import { ProfilePage } from "./pages/Profile";
import ServerErrorPage from "./pages/500";
import NotFoundPage from "./pages/404";
import Router from "./utils/Router";
import AuthController from "./controllers/AuthController";

enum Routes {
  Index = "/",
  Registration = "/sign-up",
  Profile = "/settings",
  ChatPage = "/messenger",
  Error404 = "/404",
  Error500 = "/500",
}

document.addEventListener("DOMContentLoaded", async () => {
  Router.use(Routes.Index, LoginPage)
    .use(Routes.Registration, RegistrationPage)
    .use(Routes.ChatPage, ChatPage)
    .use(Routes.Profile, ProfilePage)
    .use(Routes.Error404, NotFoundPage)
    .use(Routes.Error500, ServerErrorPage);

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
