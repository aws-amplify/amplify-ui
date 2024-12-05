import React from 'react';

import { SpanElement } from '../context/elements';

import { STORAGE_BROWSER_BLOCK_TO_BE_UPDATED } from '../constants';

export function Separator(): React.JSX.Element {
  return (
    <SpanElement
      aria-hidden
      className={`${STORAGE_BROWSER_BLOCK_TO_BE_UPDATED}__breadcrumb-separator`}
    >
      /
    </SpanElement>
  );
}
