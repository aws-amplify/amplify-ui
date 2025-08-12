/* eslint-disable no-console */
import { Button } from '@aws-amplify/ui-react';
import React from 'react';
import type { ObjectPreviewData } from '../../views/hooks/useObjectPreview';

export interface ObjectPreviewProps extends ObjectPreviewData {
  onCloseObjectPreview?: () => void;
}

export const ObjectPreview = (
  props: ObjectPreviewProps
): React.JSX.Element | null => {
  console.log('ObjectPreview props', props);
  const { onCloseObjectPreview } = props;
  const { isLoading, hasError } = props;

  if (isLoading) {
    return <div>....loading </div>;
  }

  if (hasError) {
    return <div>opps... some wrong happen </div>;
  }

  return (
    <div
      style={{
        position: 'absolute',
        right: 0,
        top: 0,
        background: 'white',
        overflow: 'scroll',
        flex: 1,
        width: '50vw',
      }}
    >
      <div>Object preview</div>
      <div>{props?.selectedObject?.key}</div>
      <div>{props?.url}</div>

      <Button onClick={onCloseObjectPreview}>Close</Button>
    </div>
  );
};
