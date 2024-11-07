import React from 'react';

import { ViewElement } from '../../context/elements/definitions';
import { CLASS_BASE } from '../constants';

const BLOCK_NAME = `amplify-${CLASS_BASE}__title`;

interface TitleControlProps {
  children?: React.ReactNode;
}

export const TitleControl = ({
  children,
}: TitleControlProps): React.JSX.Element => (
  <ViewElement className={BLOCK_NAME}>{children}</ViewElement>
);
