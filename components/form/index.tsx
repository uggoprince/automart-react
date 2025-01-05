import './style.module.css';

export const Form = (props: any) => {
    const { children, method, handleSubmit, title } = props;
    return (
        <form onSubmit={handleSubmit} className=" w-full p-4 rounded bg-white" method={method}>
            <div className="form-header">
                <h1>{title}</h1>
            </div>
            {children}
        </form>
    );
};