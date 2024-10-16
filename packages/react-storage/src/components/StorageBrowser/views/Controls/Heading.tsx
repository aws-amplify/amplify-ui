import React from 'react';

import { HeadingElement3 } from '../../context/elements/definitions';
import { CLASS_BASE } from '../constants';

const BLOCK_NAME = `${CLASS_BASE}__heading3`;

interface HeadingControlProps {
  children?: React.ReactNode;
}

export const HeadingControl = ({
  children,
}: HeadingControlProps): React.JSX.Element => (
  <HeadingElement3 className={BLOCK_NAME}>{children}</HeadingElement3>
);
