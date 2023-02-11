import React from "react";
import { Typography } from "@mui/material";

export const Text = (p: any) => {
  return <Typography variant={p.fontSize || "body2"} {...p} />;
};
