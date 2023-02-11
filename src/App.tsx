import { Typography } from "@mui/material";
import { useHistory } from "react-router-dom";
import { useAppSelector } from "./app/hooks";
import { AppRouter } from "./components/elements/AppRouter";
import { selectRoutes } from "./redux/app/appSlice";
import { privateRoutes, publicRoutes } from "./router";
import { getUserCredentialFromStorage } from "./services/auth";

function App() {
  const { role } = getUserCredentialFromStorage();
  const listRouter = useAppSelector(selectRoutes);
  const history = useHistory();

  return (
    <>
      <div>
        {listRouter.map((route, index) => {
          return (
            <Typography
              key={index}
              onClick={() => history.push(`${route.path}`)}
            >
              {route.path}
            </Typography>
          );
        })}
      </div>
      <AppRouter
        authorities={role}
        publicRoutes={publicRoutes}
        privateRoutes={privateRoutes}
        defaultRedirect="/login"
      />
    </>
  );
}

export default App;
