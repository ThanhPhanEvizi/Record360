import React from "react";
import { Button, ButtonBaseProps } from "@mui/material";

interface ButtonProps extends ButtonBaseProps {
  backgroundColor?: string;
  backgroundColorHover?: string;
  color?: string;
  colorHover?: string;
  variant?: "text" | "outlined" | "contained";
  width?: string;
  borderColor?: string;
  borderColorHover?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  sx?: any;
}

export const UiButton = ({
  children,
  type,
  backgroundColor = "button.primary",
  backgroundColorHover,
  color = "text.primary",
  colorHover,
  variant = "text",
  width,
  borderColor,
  onClick,
  borderColorHover,
  sx,
}: ButtonProps) => {
  return (
    <Button
      type={type}
      variant={variant}
      onClick={onClick}
      sx={{
        cursor: "pointer",
        backgroundColor: backgroundColor,
        color: color,
        borderColor: borderColor,
        margin: "10px 0px",
        borderRadius: "12px",
        padding: "5px 20px",
        textTransform: "capitalize",
        width: width,
        "&:hover": {
          backgroundColor: backgroundColorHover || backgroundColor,
          color: colorHover || color,
          borderColor: borderColorHover,
        },
        ...sx,
      }}
    >
      {children}
    </Button>
  );
};

export const ButtonDefault = (p: any) => {
  return (
    <UiButton
      sx={{
        padding: "7px 40px",
        backgroundColor: "#FA541C",
        borderRadius: "24px",
        color: "white",

        "&:hover": {
          backgroundColor: "rgba(157, 31, 14, 1)",
        },
      }}
      {...p}
    />
  );
};
