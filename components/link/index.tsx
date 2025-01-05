import Link from "next/link";

const HeaderLink = (props: any) => {
  const { text, href, Icon } = props;
  return (
    <li className="sm:mr-1">
      <Link href={href} className="cursor-pointer">
        <a
          className="
        px-3
        py-3
        sm:px-5
        text-blue-600
        hover:bg-blue-600
        hover:text-white
        sm:rounded
        block"
        >
          {Icon && <Icon className="inline align-middle mx-1" />}
          <div className="inline align-middle">{text}</div>
        </a>
      </Link>
    </li>
  );
};

export const HyperLink = (props: any) => {
  const { children, link, title, classList } = props;
  return (
    <div className="cursor-pointer">
      <Link href={link}>
        <span className={`${classList}`} title={title}>
          {children}
        </span>
      </Link>
    </div>
  );
};

export default HeaderLink;
