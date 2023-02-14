import {
  TextField,
  FormLabel,
  FormControl,
  InputAdornment,
  FormControlLabel,
  Checkbox,
  FormHelperText,
} from "@mui/material";
import * as React from "react";
import { Control, useController } from "react-hook-form";

interface CheckboxFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  control: Control<any>;
  label?: string;
  multiline?: boolean;
  icon?: string;
}

export function CheckboxField({
  name,
  control,
  label,
  multiline,
  icon,
  ...inputProps
}: CheckboxFieldProps) {
  const {
    field: { value, onChange, onBlur, ref },
    fieldState: { error, invalid },
  } = useController({ name, control });

  return (
    <FormControl error={invalid} sx={{ marginBottom: "10px" }}>
      <FormControlLabel
        control={<Checkbox />}
        checked={value || false}
        onChange={onChange}
        onBlur={onBlur}
        ref={ref}
        label={label}
      />
      <FormHelperText sx={{ marginLeft: "0px" }}>
        {error?.message}
      </FormHelperText>
    </FormControl>
  );
}
