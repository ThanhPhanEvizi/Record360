import React from "react";
import { Tooltip, tooltipClasses, TooltipProps } from "@mui/material";
import { styled } from "@mui/material/styles";

export const UiToolTip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "rgba(12, 7, 10, 0.8)",
    color: "white",
    fontSize: "0.95rem",
    padding: "10px 15px",
    borderRadius: "12px",
  },
}));
