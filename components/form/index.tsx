import styles from './Form.module.css';

interface FormProps {
  children: React.ReactNode;
  method: string;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  title: string;
}

export const Form = (props: FormProps) => {
  const { children, method, handleSubmit, title } = props;
  return (
    <form
      onSubmit={handleSubmit}
      className=' w-full p-4 rounded bg-white'
      method={method}
    >
      <div className={styles.formHeader}>
        <h1 className='py-4'>{title}</h1>
      </div>
      <div className='w-auto h-auto'>{children}</div>
    </form>
  );
};
