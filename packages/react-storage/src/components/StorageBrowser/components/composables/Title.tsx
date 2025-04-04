import React from 'react';

import { STORAGE_BROWSER_BLOCK } from '../base';
import { HeadingElement } from '../elements';

export interface TitleProps {
  title?: string;
}

export const Title = ({ title }: TitleProps): React.JSX.Element => (
  <HeadingElement className={`${STORAGE_BROWSER_BLOCK}__title`}>
    {title}
  </HeadingElement>
);
