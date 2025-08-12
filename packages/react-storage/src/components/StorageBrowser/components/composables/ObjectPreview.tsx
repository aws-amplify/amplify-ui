/* eslint-disable no-console */
import { Button } from '@aws-amplify/ui-react';
import React from 'react';
import type { ObjectPreviewData } from '../../views/hooks/useObjectPreview';
import type { FileType } from '../../views/utils/objectPreview/const';
import { ImagePreview } from '../base/preview/ImagePreview';
import { useFilePreview } from '../../filePreview/context';

export interface ObjectPreviewProps extends ObjectPreviewData {
  onCloseObjectPreview?: () => void;
}

export const ObjectPreview = (
  props: ObjectPreviewProps
): React.JSX.Element | null => {
  const { onCloseObjectPreview } = props;
  const { isLoading, hasError, selectedObject, url } = props;
  const { rendererResolver } = useFilePreview() ?? {};

  if (!selectedObject) return null;

  const { key, fileType } = selectedObject;

  if (isLoading) {
    return <div>....loading </div>;
  }

  if (hasError) {
    return <div>opps... some wrong happen </div>;
  }

  function getDefaultRenderer(type: FileType | null) {
    switch (type) {
      case 'image':
        return <ImagePreview key={key} url={url} />;

      case 'video':
        return <div>video</div>;

      case 'text':
        return <div>Text</div>;

      case 'unknown':
        return <div>unsupported</div>;

      default:
        return null;
    }
  }

  function resolveRenderer() {
    if (rendererResolver && fileType) {
      const CustomRenderer = rendererResolver(fileType as FileType);
      if (CustomRenderer) {
        return <CustomRenderer url={url!} fileProperties={selectedObject!} />;
      }
    }
    return getDefaultRenderer(fileType as FileType);
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
      <div>{resolveRenderer()}</div>
      <div>{props?.selectedObject?.key}</div>
      <Button onClick={onCloseObjectPreview}>Close</Button>
    </div>
  );
};
