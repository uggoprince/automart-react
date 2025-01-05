import TextField from '@mui/material/TextField';

export const Input = (props: any) => {
  const { label, required, error, errorText, type, defaultValue, css, name } = props;
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
    />
    );
};
