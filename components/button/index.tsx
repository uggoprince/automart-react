import MButton from '@mui/material/Button';

interface ButtonProps {
  text: string;
  handleClick: () => void;
  type?: 'button' | 'submit' | 'reset'; // Limit valid types
  disable?: boolean; // Optional prop for disabling the button
  extra_css?: string; // Optional additional CSS classes
}

const Button = (props: ButtonProps) => {
  const { text, handleClick, type = 'button', disable, extra_css = '' } = props;
  return (
    <MButton
      disabled={disable}
      onClick={handleClick}
      variant='contained'
      type={type}
      className={`bg-blue-500 text-white px-2 py-2 rounded ${extra_css}`}
    >
      {text}
    </MButton>
  );
};

export default Button;
