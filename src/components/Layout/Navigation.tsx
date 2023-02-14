import { Typography } from "@mui/material";
import { useHistory } from "react-router-dom";
import { privateRoutes, publicRoutes } from "../../router";
import { getUserCredentialFromStorage } from "../../services/auth";
import { checkPermissions } from "../../until/helpers";
import { Col, Row } from "../elements";
import { BasicRoute } from "../elements/AppRouter";

const Navigation = () => {
  const history = useHistory();
  const privateMenu = privateRoutes;
  const publicMenu = publicRoutes;

  const renderParentMenuItem = (item: BasicRoute, parentPath: any) => {
    const { role } = getUserCredentialFromStorage();
    const fullPath =
      parentPath && parentPath !== "/"
        ? `${parentPath}${item.path}`
        : item.path;
    const hasPermission = checkPermissions(role || "", item.roles);
    if (!hasPermission) {
      return null;
    }
    console.log("fullPath:", fullPath);
    return (
      <Col key={fullPath}>
        <Row>
          <Typography onClick={() => history.push(`/${fullPath}`)}>
            {item.label}-Sub
          </Typography>
        </Row>
        <Col sx={{ marginLeft: "50px" }}>
          {item.routes &&
            item.routes.map((routes) => {
              return renderMenuItems(routes);
            })}
        </Col>
      </Col>
    );
  };

  const renderSingleMenuItem = (item: BasicRoute, parentPath: any) => {
    const fullPath =
      parentPath && parentPath !== "/"
        ? `${parentPath}${item.path}`
        : item.path;
    console.log("fullPath:", fullPath);
    return (
      <Row key={fullPath}>
        <Typography onClick={() => history.push(`${fullPath}`)}>
          {item.label}
        </Typography>
      </Row>
    );
  };

  const renderMenuItems = (item: BasicRoute, parentPath = ""): any => {
    if (item.routes) {
      if (item.label) {
        return renderParentMenuItem(item, item.path);
      }
      return item.routes.map((route) => {
        return renderMenuItems(route, parentPath);
      });
    }
    if (item.label) {
      return renderSingleMenuItem(item, parentPath);
    }
    return null;
  };

  return (
    <>
      <Col>
        {publicMenu.map((item) => {
          return renderMenuItems(item, "");
        })}
        {privateMenu.map((item) => {
          return renderMenuItems(item, "");
        })}
      </Col>
    </>
  );
};

export default Navigation;
