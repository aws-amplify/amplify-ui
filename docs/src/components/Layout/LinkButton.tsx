import * as React from 'react';

const LinkButton = (
  {
    onClick,
    href,
    classNames,
    children,
  }: {
    onClick?: React.MouseEventHandler<HTMLAnchorElement>;
    href: string;
    classNames?: string;
    children?: React.ReactElement;
  },
  ref
) => (
  <a onClick={onClick} className={classNames} href={href} ref={ref}>
    {children}
  </a>
);

export default React.forwardRef(LinkButton);
