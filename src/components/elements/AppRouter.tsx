/* eslint-disable react/prop-types */
import React, { memo } from "react";
import {
  BrowserRouter,
  Redirect,
  Route,
  RouteProps,
  Switch,
} from "react-router-dom";
import { isObject, omit } from "lodash";
// import { AdminRole } from "~/types/models/admin";
// import { checkPermissions, getObjNthItem } from "~/utils/helpers";
import { Typography } from "@mui/material";
import { Col } from ".";
import { checkPermissions } from "../../until/helpers";
import { useAppDispatch } from "../../app/hooks";
import { addRouter } from "../../redux/app/appSlice";

export interface BasicRoute extends RouteProps {
  position?: "left" | "right";
  path: string;
  redirect?: string | Record<string, string>;
  routes?: BasicRoute[];
  action?: "new-tab";
  label?: string;
  class?: string;
  roles?: string[];
}

export interface PrivateRoute extends BasicRoute {
  routes?: PrivateRoute[];
}

export interface AppRouterProps {
  basename?: string;
  //   authorities?: AdminRole[];
  authorities?: any;
  defaultRedirect: string;
  privateRoutes?: PrivateRoute[];
  publicRoutes?: BasicRoute[];
  notFoundPage?: React.FunctionComponent<any>;
  unauthorizedPage?: React.FunctionComponent<any>;
}

const omitRouteRenderProps = (route: BasicRoute) => {
  return omit(route, ["render", "component"]);
};

const NotFoundPageDefault = () => {
  return (
    <div>
      <h1>This is a not found page by default</h1>
    </div>
  );
};

const UnauthorizedPageDefault = () => {
  return (
    <Col
      sx={{ height: "100vh", alignItems: "center", justifyContent: "center" }}
    >
      <Typography fontSize="lg" fontWeight="bold">
        Your account is not verified yet. Please contact IT team for supports
      </Typography>
    </Col>
  );
};

export const EmptyLayout = memo(
  ({ children }: { children: React.ReactNode }) => {
    return <div>{children}</div>;
  }
);

export const AppRouter = memo(function AppRouter({
  basename,
  authorities,
  defaultRedirect,
  privateRoutes = [],
  publicRoutes = [],
  notFoundPage: NotFoundPage = NotFoundPageDefault,
  unauthorizedPage: UnauthorizedPage = UnauthorizedPageDefault,
}: AppRouterProps) {
  const dispatch = useAppDispatch();
  const a = [];
  const renderPublicRoute = (route: BasicRoute, parentPath = "") => {
    const { path, component: RouteComponent = EmptyLayout, exact } = route;
    const fullPath =
      parentPath && parentPath !== "/" ? `${parentPath}${path}` : path;

    // Handle redirect URLs
    if (route.redirect) {
      console.log("hihi");
      //   return renderRedirectRoute(route);
    }

    if (route.routes) {
      const subRoutes = route?.routes?.map((subRoute) =>
        renderPublicRoute(subRoute, fullPath)
      );

      return (
        <Route
          key={`public-${fullPath}`}
          exact={exact === undefined ? true : exact}
          {...omitRouteRenderProps(route)}
          path={fullPath}
          render={(props) => (
            <RouteComponent {...props}>
              <Switch>{subRoutes}</Switch>
            </RouteComponent>
          )}
        />
      );
    }
    console.log("public:", route);

    dispatch(addRouter({ path: route.path, label: route.label }));
    return (
      <Route
        key={`public-${fullPath}`}
        exact={exact === undefined ? true : exact}
        {...omitRouteRenderProps(route)}
        path={fullPath}
        render={(props) => <RouteComponent {...props} />}
      />
    );
  };

  const renderPrivateRoute = (route: PrivateRoute, parentPath = "") => {
    const {
      roles,
      redirect,
      path,
      component: RouteComponent = EmptyLayout,
      exact,
    } = route;
    const hasPermission = checkPermissions(authorities, roles);
    const fullPath =
      parentPath && parentPath !== "/" ? `${parentPath}${path}` : path;
    if (!hasPermission) {
      if (redirect) {
        console.log("private redirect hasPermission");
        return;
        // return renderRedirectRoute(route, authorities);
      }
      console.log("private !redirect hasPermission");
      return;
      //   return (
      //     <Route
      //       key={`private-${fullPath}`}
      //       {...omitRouteRenderProps(route)}
      //       path={fullPath}
      //       render={(props) => <UnauthorizedPage {...props} />}
      //     />
      //   );
    }
    if (route.routes) {
      const subRoutes = route?.routes?.map((subRoute) =>
        renderPrivateRoute(subRoute, fullPath)
      );
      return (
        <Route
          key={`private-${fullPath}`}
          exact={exact === undefined ? true : exact}
          {...omitRouteRenderProps(route)}
          path={fullPath}
          render={(props) => {
            return (
              <RouteComponent {...props}>
                <Switch>{subRoutes}</Switch>
              </RouteComponent>
            );
          }}
        />
      );
    }
    dispatch(addRouter({ path: route.path, label: route.label }));
    return (
      <Route
        key={`private-${fullPath}`}
        exact={exact === undefined ? true : exact}
        {...omitRouteRenderProps(route)}
        path={fullPath}
        render={(props) => <RouteComponent {...props} />}
      />
    );
  };

  const renderNotFoundRoute = () => {
    return (
      <Route
        path="*"
        key="notfound-route"
        render={(props) => <NotFoundPage {...props} />}
      />
    );
  };

  return (
    <BrowserRouter basename={basename}>
      <Switch>
        {publicRoutes.map((route) => {
          return renderPublicRoute(route);
        })}
      </Switch>
      <Switch>
        {privateRoutes.map((route) => {
          return renderPrivateRoute(route);
        })}
      </Switch>
      <Switch>{renderNotFoundRoute()}</Switch>
    </BrowserRouter>
  );
});
