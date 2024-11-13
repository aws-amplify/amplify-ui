import React from 'react';

import { HeadingElement } from '../context/elements';
import { AMPLIFY_CLASS_BASE } from '../views/constants';

export interface TitleProps {
  title?: string;
}

export const Title = ({ title }: TitleProps): React.JSX.Element => (
  <HeadingElement className={`${AMPLIFY_CLASS_BASE}__title`}>
    {title}
  </HeadingElement>
);
