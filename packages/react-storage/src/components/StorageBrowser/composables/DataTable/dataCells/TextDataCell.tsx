import React from 'react';

import {
  IconElement,
  StorageBrowserIconType,
  SpanElement,
  ViewElement,
} from '../../../context/elements';
import { STORAGE_BROWSER_BLOCK } from '../../../constants';

export interface TextDataCellProps {
  content: {
    icon?: StorageBrowserIconType;
    text?: string;
  };
}

export const TextDataCell = ({
  content,
}: TextDataCellProps): React.JSX.Element => {
  const { icon, text } = content;
  return (
    <ViewElement className={`${STORAGE_BROWSER_BLOCK}__table-text-data-cell`}>
      {icon && (
        <IconElement
          className={`${STORAGE_BROWSER_BLOCK}__table-text-data-cell-icon ${STORAGE_BROWSER_BLOCK}__table-text-data-cell-icon--${icon}`}
          variant={icon}
        />
      )}
      <SpanElement
        className={`${STORAGE_BROWSER_BLOCK}__table-text-data-cell-text`}
        title={text}
      >
        {text}
      </SpanElement>
    </ViewElement>
  );
};
