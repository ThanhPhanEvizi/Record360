import * as React from "react";
import Switch from "@mui/material/Switch";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  switch_track: {
    backgroundColor: "rgb(224, 224, 224)",
  },
  switch_base: {
    color: "rgb(224, 224, 224)",
    "&.Mui-disabled": {
      color: "rgb(224, 224, 224)",
    },
    "&.Mui-checked": {
      color: "rgb(96, 109, 136)",
    },
    "&.Mui-checked + .MuiSwitch-track": {
      backgroundColor: "rgb(96, 109, 136)",
    },
  },
  switch_primary: {
    "&.Mui-checked": {
      color: "rgb(96, 109, 136)",
    },
    "&.Mui-checked + .MuiSwitch-track": {
      backgroundColor: "rgb(96, 109, 136)",
    },
  },
}));

export const UiSwitch = () => {
  const classes = useStyles();

  return (
    <Switch
      classes={{
        track: classes.switch_track,
        switchBase: classes.switch_base,
        colorPrimary: classes.switch_primary,
      }}
    />
  );
};
