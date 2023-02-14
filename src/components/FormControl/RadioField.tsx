import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { Control, useController } from "react-hook-form";

interface RadioOption {
  label?: string;
  value: string | number;
  color?: string;
}

interface RadioFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  control: Control<any>;
  label?: string;
  options: RadioOption[];
}

export const RadioField = ({
  name,
  control,
  label,
  options,
}: RadioFieldProps) => {
  const {
    field: { value, onChange, onBlur, ref },
    fieldState: { error, invalid },
  } = useController({ name, control });

  return (
    <FormControl error={invalid}>
      <FormLabel id="demo-controlled-radio-buttons-group">{label}</FormLabel>
      <RadioGroup onChange={onChange} onBlur={onBlur} value={value} row>
        {options.map((option: RadioOption) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            label={option.label}
            control={<Radio sx={{ color: option.color || "" }} />}
          />
        ))}
      </RadioGroup>
      <FormHelperText sx={{ marginLeft: "0px" }}>
        {error?.message}
      </FormHelperText>
    </FormControl>
  );
};
