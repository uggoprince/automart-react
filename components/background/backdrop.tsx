const Backdrop = (props: any) => {
  const { children } = props;
  return (
    <div className="
    backdrop-blur-lg
    box-border block bg-white/60 w-full h-full sticky overflow-hidden">
      {children}
    </div>
  );
};

export default Backdrop;
