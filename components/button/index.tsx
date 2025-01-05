import Button from '@mui/material/Button';

export default (props: any) => {
    const { text, handleClick, type, disable } = props;
    return (<Button disabled={disable} onClick={handleClick} variant="contained" type={type} 
        className='bg-blue-500 text-white px-4 py-4 rounded'>{text}</Button>);
};
