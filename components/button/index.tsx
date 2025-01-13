import { Button as MuiButton } from '@mui/material';

interface ButtonProps {
  text: string;
  handleClick: () => void;
  type: string;
  disable: boolean;
  extra_css: string;
}

const Button = (props: ButtonProps) => {
  const { text, handleClick, type, disable, extra_css = '' } = props;
  return (
    <MuiButton
      disabled={disable}
      onClick={handleClick}
      variant='contained'
      type={type}
      className={`bg-blue-500 text-white px-4 py-4 rounded ${extra_css}`}
    >
      {text}
    </MuiButton>
  );
};

export default Button;
