import React from 'react';

import { HeadingElement } from '../context/elements/definitions';

export interface TitleProps {
  children?: React.ReactNode;
  titleClassName?: string;
}

export const Title = ({
  children,
  titleClassName,
}: TitleProps): React.JSX.Element => (
  <HeadingElement className={titleClassName}>{children}</HeadingElement>
);
