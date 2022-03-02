import { forwardRef } from 'react';
import type { MouseEventHandler, ReactElement } from 'react';

const LinkButton = (
  {
    onClick,
    href,
    classNames,
    children,
  }: {
    onClick?: MouseEventHandler<HTMLAnchorElement>;
    href: string;
    classNames?: string;
    children?: ReactElement;
  },
  ref
) => (
  <a onClick={onClick} className={classNames} href={href} ref={ref}>
    {children}
  </a>
);

export default forwardRef(LinkButton);
