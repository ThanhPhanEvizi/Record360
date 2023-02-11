import React from "react";
import { Box } from "@mui/material";

export const Col = (p: any) => {
  return <Box display="flex" flexDirection="column" {...p} />;
};
