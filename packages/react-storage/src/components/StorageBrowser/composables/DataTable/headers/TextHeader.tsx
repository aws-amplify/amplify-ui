import React from 'react';

import { capitalize } from '@aws-amplify/ui';

import { ViewElement } from '../../../context/elements';
import { CLASS_BASE } from '../../../views/constants';

export type TextHeaderProps = {
  content: {
    text?: string;
  };
};

export const TextHeader = ({ content }: TextHeaderProps): React.JSX.Element => {
  const { text } = content;
  return (
    <ViewElement className={`${CLASS_BASE}__table-text-header`}>
      {text && capitalize(text)}
    </ViewElement>
  );
};
