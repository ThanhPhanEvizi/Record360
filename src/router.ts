import { BasicRoute, PrivateRoute } from "./components/elements/AppRouter";
import { PAGES, USERS_ROLE } from "./constants";
import ForgotPasswordPage from "./page/ForgotPassword";
import GroupPage from "./page/Group";
import HomePage from "./page/Home/page";
import LoginPage from "./page/Login";
import MessPage from "./page/Mess";
import ProfilePage from "./page/Profile";
import SettingPage from "./page/Setting";

export const publicRoutes: BasicRoute[] = [
  {
    path: "",
    // component: BaseLayout,
    exact: false,
    routes: [
      //   { path: PAGES.HOME_PAGE, component: HomePage, roles: [USERS_ROLE.ADMIN] },
      { path: PAGES.LOGIN, component: LoginPage, label: "Login" },
      {
        path: PAGES.FORGOT_PASSWORD,
        component: ForgotPasswordPage,
        label: "Forgot Password",
      },
    ],
  },
];

export const privateRoutes: BasicRoute[] = [
  {
    path: "",
    // component: PrivateLayout,
    exact: false,
    routes: [
      {
        path: PAGES.GROUP,
        component: GroupPage,
        roles: [USERS_ROLE.USER],
        label: "Group Page",
      },
      {
        path: PAGES.SETTING,
        component: SettingPage,
        roles: [USERS_ROLE.ADMIN],
        label: "Setting Page",
        routes: [
          {
            path: PAGES.HOME_PAGE,
            component: HomePage,
            roles: [USERS_ROLE.ADMIN],
            label: "Home Page",
          },
          {
            path: PAGES.PROFILE,
            component: ProfilePage,
            roles: [USERS_ROLE.ADMIN],
            label: "Profile",
          },
          {
            path: PAGES.MESS,
            component: MessPage,
            roles: [USERS_ROLE.ADMIN],
            label: "Mess",
          },
        ],
      },
      {
        path: PAGES.HOME_PAGE,
        component: HomePage,
        roles: [],
        label: "Home Page",
      },
      {
        path: PAGES.PROFILE,
        component: ProfilePage,
        roles: [USERS_ROLE.ADMIN],
        label: "Profile",
      },
      {
        path: PAGES.MESS,
        component: MessPage,
        roles: [USERS_ROLE.ADMIN],
        label: "Mess",
      },
    ],
  },
];
