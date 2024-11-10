import React from 'react';

import { HeadingElement } from '../../context/elements/definitions';
import { AMPLIFY_CLASS_BASE } from '../constants';

const BLOCK_NAME = `${AMPLIFY_CLASS_BASE}__title`;

interface TitleControlProps {
  children?: React.ReactNode;
}

export const TitleControl = ({
  children,
}: TitleControlProps): React.JSX.Element => (
  <HeadingElement className={BLOCK_NAME}>{children}</HeadingElement>
);
