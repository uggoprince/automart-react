import TextField from '@mui/material/TextField';

interface InputProps {
  label: string;
  required?: boolean;
  error?: boolean;
  errorText?: string | null;
  type?: string;
  defaultValue?: string;
  css?: string;
  name?: string;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = (props: InputProps) => {
  const {
    label,
    required,
    error,
    errorText,
    type,
    defaultValue,
    css,
    name,
    handleChange = () => {},
  } = props;
  return (
    <TextField
      required={required}
      label={label}
      defaultValue={defaultValue}
      error={error}
      helperText={errorText}
      type={type}
      fullWidth
      value={defaultValue}
      className={css}
      name={name}
      onChange={handleChange}
    />
  );
};
