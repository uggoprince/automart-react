import Link from 'next/link';
import { ReactNode } from 'react';

interface HeaderLinkTypeProps {
  text: string;
  href: string;
  Icon?: React.ComponentType<{ className?: string }>;
}

interface HyperLinkTypeProps {
  children: ReactNode;
  link: string;
  title?: string;
  classList?: string;
  handleClick?: () => void;
}

interface HeaderButtonProps {
  text: string;
  classList?: string;
  handleClick?: () => void;
  Icon?: React.ComponentType<{ className?: string }>;
}

const HeaderLink = (props: HeaderLinkTypeProps) => {
  const { text, href, Icon } = props;
  return (
    <li className='sm:mr-1'>
      <Link href={href} className='cursor-pointer'>
        <a
          className='
        px-3
        py-3
        sm:px-5
        text-blue-600
        hover:bg-blue-600
        hover:text-white
        sm:rounded
        flex flex-row sm:justify-around items-center gap-[6px]'
        >
          {Icon && <Icon className='inline align-middle' />}
          <div className='inline align-middle'>{text}</div>
        </a>
      </Link>
    </li>
  );
};

export const HyperLink = (props: HyperLinkTypeProps) => {
  const { children, link, title, classList } = props;
  return (
    <div className='cursor-pointer'>
      <Link href={link}>
        <span className={`${classList}`} title={title}>
          {children}
        </span>
      </Link>
    </div>
  );
};

export const HeaderButton = (props: HeaderButtonProps) => {
  const { text, handleClick = () => {}, Icon } = props;
  return (
    <div
      className='cursor-pointer px-3
        py-3
        sm:px-5
        text-blue-600
        hover:bg-blue-600
        hover:text-white
        sm:rounded
        flex flex-row sm:justify-around items-center gap-[6px]'
      onClick={handleClick}
    >
      {Icon && <Icon className='inline align-middle' />}
      <button className={'inline align-middle'}>{text}</button>
    </div>
  );
};

export default HeaderLink;
