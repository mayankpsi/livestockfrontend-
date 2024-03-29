import { TextField, InputAdornment } from "@mui/material";
import { VisibilityOutlinedIcon, VisibilityOffIcon } from "../../../icons";

const CustomTextField = ({
  placeholder,
  disabled,
  name,
  select,
  label,
  value,
  onInputChange,
  showPassword,
  setShowPassword,
  register,
  errors,
}) => {
  return (
    <TextField
      sx={{ background: "#fff", textTransform: "capitalize" }}
      disabled={disabled}
      fullWidth
      id={name}
      select={select}
      label={label}
      variant="outlined"
      size="large"
      value={value}
      name={name}
      type={
        name?.toLowerCase()?.includes("password") && !showPassword
          ? "password"
          : "text"
      }
      placeholder={placeholder}
      InputProps={{
        sx: { borderRadius: "0 !important" },
        endAdornment: name?.toLowerCase()?.includes("password") ? (
          <InputAdornment
            position="end"
            onClick={() => setShowPassword(!showPassword)}
          >
            {!showPassword ? <VisibilityOutlinedIcon /> : <VisibilityOffIcon />}
          </InputAdornment>
        ) : null,
      }}
      {...register(name, { required: true })}
      onChange={onInputChange}
      error={errors?.[name] ? true : false}
      helperText={errors?.[name]?.message}
    />
  );
};

export default CustomTextField;
