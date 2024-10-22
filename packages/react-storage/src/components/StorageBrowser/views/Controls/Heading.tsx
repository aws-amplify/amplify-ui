import React from 'react';

import {
  HeadingElement,
  HeadingElement3,
} from '../../context/elements/definitions';
import { CLASS_BASE } from '../constants';

const BLOCK_NAME = `${CLASS_BASE}__heading3`;

interface HeadingControlProps {
  children?: React.ReactNode;
  level: 2 | 3 | 4;
}

export const HeadingControl = ({
  children,
  level = 2,
}: HeadingControlProps): React.JSX.Element => {
  switch (level) {
    case 2:
      return <HeadingElement className={BLOCK_NAME}>{children}</HeadingElement>;
    case 3:
      return (
        <HeadingElement3 className={BLOCK_NAME}>{children}</HeadingElement3>
      );
    default:
      return <HeadingElement className={BLOCK_NAME}>{children}</HeadingElement>;
  }
};
