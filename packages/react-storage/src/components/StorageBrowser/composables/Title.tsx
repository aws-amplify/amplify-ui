import React from 'react';

import { HeadingElement } from '../context/elements';
import { CLASS_BASE } from '../views/constants';

const BLOCK_NAME = `${CLASS_BASE}__title`;

export interface TitleProps {
  title?: string;
}

export const Title = ({ title }: TitleProps): React.JSX.Element => (
  <HeadingElement className={BLOCK_NAME}>{title}</HeadingElement>
);
