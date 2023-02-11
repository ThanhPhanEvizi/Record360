import { LoadingButton } from "@mui/lab";
import { ButtonProps } from "@mui/material";

interface UiLoadingButtonProps extends ButtonProps {
  isLoading: boolean;
  isSubmitting: boolean;
}

export const UiLoadingButton = ({
  sx,
  children,
  isLoading,
  isSubmitting,
}: UiLoadingButtonProps) => {
  return (
    <LoadingButton
      type="submit"
      variant="contained"
      color="primary"
      loading={isLoading}
      loadingPosition="start"
      disabled={isSubmitting}
      sx={{
        backgroundColor: "rgba(208, 102, 102, 1)",
        padding: "10px 20px",
        textTransform: "none",
        margin: "10px 0px",
        width: "100%",
        borderRadius: "12px",
        ...sx,
      }}
    >
      {children}
    </LoadingButton>
  );
};
