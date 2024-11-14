import React from 'react';

import { HeadingElement } from '../context/elements';
import { STORAGE_BROWSER_BLOCK } from '../constants';

export interface TitleProps {
  title?: string;
}

export const Title = ({ title }: TitleProps): React.JSX.Element => (
  <HeadingElement className={`${STORAGE_BROWSER_BLOCK}__title`}>
    {title}
  </HeadingElement>
);
