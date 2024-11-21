import React from 'react';

import { ViewElement } from '../../../context/elements';
import { STORAGE_BROWSER_BLOCK_TO_BE_UPDATED } from '../../../constants';

export type TextHeaderProps = {
  content: {
    text?: string;
  };
};

export const TextHeader = ({ content }: TextHeaderProps): React.JSX.Element => {
  const { text } = content;
  return (
    <ViewElement
      className={`${STORAGE_BROWSER_BLOCK_TO_BE_UPDATED}__table-text-header`}
    >
      {text}
    </ViewElement>
  );
};
