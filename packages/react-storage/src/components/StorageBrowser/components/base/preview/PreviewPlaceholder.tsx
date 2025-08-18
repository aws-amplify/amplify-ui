import React from 'react';
import { Placeholder } from '@aws-amplify/ui-react';
import { ViewElement } from '../../elements';
import { STORAGE_BROWSER_BLOCK } from '../constants';

export function PreviewPlaceholder(): React.JSX.Element {
  return (
    <ViewElement className={`${STORAGE_BROWSER_BLOCK}__preview-placeholder`}>
      <ViewElement
        className={`${STORAGE_BROWSER_BLOCK}__preview-placeholder-main`}
      >
        <Placeholder width="100%" height="100%" />
      </ViewElement>

      <ViewElement
        className={`${STORAGE_BROWSER_BLOCK}__preview-placeholder-metadata`}
      >
        <ViewElement
          className={`${STORAGE_BROWSER_BLOCK}__preview-placeholder-header`}
        >
          <Placeholder width="20px" height="20px" />
          <Placeholder width="120px" height="16px" />
        </ViewElement>

        <ViewElement
          className={`${STORAGE_BROWSER_BLOCK}__preview-placeholder-content`}
        >
          <Placeholder width="200px" height="14px" />
          <Placeholder width="150px" height="14px" />
          <Placeholder width="180px" height="14px" />
          <Placeholder width="100px" height="14px" />
        </ViewElement>

        <ViewElement
          className={`${STORAGE_BROWSER_BLOCK}__preview-placeholder-actions`}
        >
          <Placeholder width="100px" height="32px" />
          <Placeholder width="80px" height="32px" />
        </ViewElement>
      </ViewElement>
    </ViewElement>
  );
}
