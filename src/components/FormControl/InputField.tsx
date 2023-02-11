import {
  TextField,
  FormLabel,
  FormControl,
  InputAdornment,
} from "@mui/material";
import * as React from "react";
import { Control, useController } from "react-hook-form";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  control: Control<any>;
  label?: string;
  multiline?: boolean;
  icon?: string;
}

export function InputField({
  name,
  control,
  label,
  multiline,
  icon,
  ...inputProps
}: InputFieldProps) {
  const {
    field: { value, onChange, onBlur, ref },
    fieldState: { error, invalid },
  } = useController({ name, control });

  return (
    <FormControl sx={{ marginBottom: "10px" }}>
      <FormLabel
        sx={{
          fontSize: "0.875rem",
          color: error ? "#d32f2f" : "rgb(97, 97, 97)",
          fontWeight: "600",
          marginBottom: "8px",
          lineHeight: "1.4375em",
        }}
      >
        {label}
      </FormLabel>
      <TextField
        sx={{
          margin: "0px",
          "& label.Mui-focused": {
            color: "button.primary",
          },
          "& .MuiInput-underline:after": {
            borderBottomColor: "button.primary",
          },
          "& .MuiOutlinedInput-root": {
            borderRadius: "20px",
            fontSize: "16px",
            paddingLeft: "5px",
            "& fieldset": {
              borderColor: "button.primary",
            },
            "&:hover fieldset": {
              borderColor: "button.primary",
            },
            "&.Mui-focused fieldset": {
              borderColor: "button.primary",
            },
          },

          input: {
            "&::placeholder": {
              fontSize: "14px",
              paddingLeft: "0px",
            },
          },
        }}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        ref={ref}
        error={invalid}
        helperText={error?.message}
        inputProps={inputProps}
        fullWidth
        multiline={multiline}
        margin="normal"
        InputProps={{
          startAdornment: (
            <InputAdornment
              position="start"
              sx={{ marginLeft: icon ? "10px" : "0px" }}
            >
              {/* {icon && <UiIcon icon={icon} />} */}
            </InputAdornment>
          ),
        }}
      />
    </FormControl>
  );
}
