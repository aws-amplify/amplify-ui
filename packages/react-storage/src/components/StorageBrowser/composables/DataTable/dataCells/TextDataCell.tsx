import React from 'react';

import {
  IconElement,
  IconVariant,
  SpanElement,
  ViewElement,
} from '../../../context/elements';
import { CLASS_BASE } from '../../../views/constants';

export interface TextDataCellProps {
  content: {
    icon?: IconVariant;
    text?: string;
  };
}

export const TextDataCell = ({
  content,
}: TextDataCellProps): React.JSX.Element => {
  const { icon, text } = content;
  return (
    <ViewElement className={`${CLASS_BASE}__table-text-data-cell`}>
      {icon && (
        <IconElement
          className={`${CLASS_BASE}__table-text-data-cell-icon ${CLASS_BASE}__table-text-data-cell-icon--${icon}`}
          variant={icon}
        />
      )}
      <SpanElement
        className={`${CLASS_BASE}__table-text-data-cell-text`}
        title={text}
      >
        {text}
      </SpanElement>
    </ViewElement>
  );
};
