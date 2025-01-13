import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';
import { FormControl, FormHelperText, InputLabel } from '@mui/material';

interface PasswordInputProps {
  required?: boolean;
  error?: boolean;
  errorText?: string | null;
  name: string;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const PasswordInput = (props: PasswordInputProps) => {
  const { required, error, errorText, name, handleChange = () => {} } = props;
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  return (
    <FormControl variant='outlined' fullWidth required={required} error={error}>
      <InputLabel htmlFor='outlined-adornment-password'>Password</InputLabel>
      <OutlinedInput
        type={showPassword ? 'text' : 'password'}
        endAdornment={
          <InputAdornment position='end'>
            <IconButton
              aria-label='toggle password visibility'
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              onMouseUp={handleMouseUpPassword}
              edge='end'
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        name={name}
        label='Password'
        onChange={handleChange}
      />
      {error && <FormHelperText id='error-text'>{errorText}</FormHelperText>}
    </FormControl>
  );
};
