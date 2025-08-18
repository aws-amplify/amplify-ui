import React from 'react';
import { Placeholder } from '@aws-amplify/ui-react';
import { ViewElement } from '../../elements';
import { STORAGE_BROWSER_BLOCK } from '../constants';

export function PreviewPlaceholder(): React.JSX.Element {
  return (
    <ViewElement className={`${STORAGE_BROWSER_BLOCK}__preview-placeholder`}>
      <ViewElement
        className={`${STORAGE_BROWSER_BLOCK}__preview-placeholder-content`}
      >
        <Placeholder width="100%" height="400px" />
      </ViewElement>
    </ViewElement>
  );
}
