const HomeBody = (props: any) => {
  const { children }: any = props;
  return (
    <div
      className="
      w-full
      min-h-full
      flex
      place-items-center
      flex-wrap
      py-5
      gap-4
      box-border bg-yellow-500"
    >
      {children}
    </div>
  );
  // }
};

export default HomeBody;
