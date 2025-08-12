/* eslint-disable no-console */
import { Button } from '@aws-amplify/ui-react';
import React from 'react';
import type { ObjectPreviewData } from '../../views/hooks/useObjectPreview';
import type { FileType } from '../../views/utils/objectPreview/const';
import { ImagePreview } from '../base/preview/ImagePreview';
import { useFilePreview } from '../../filePreview/context';
import { VideoPreview } from '../base/preview/VideoPreview';
import { TextPreview } from '../base/preview/TextPreview';
import { UnsupportedView } from '../base/preview/UnsupportedView';

export interface ObjectPreviewProps extends ObjectPreviewData {
  onCloseObjectPreview?: () => void;
}

export const ObjectPreview = (
  props: ObjectPreviewProps
): React.JSX.Element | null => {
  const { onCloseObjectPreview } = props;
  const { isLoading, hasError, selectedObject, url } = props;
  const { rendererResolver } = useFilePreview() ?? {};

  console.log('selectedObject ', selectedObject);

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
        return <ImagePreview objectKey={key} url={url} />;

      case 'video':
        return <VideoPreview objectKey={key} url={url} />;

      case 'text':
        return <TextPreview objectKey={key} url={url} />;

      case 'unknown':
      default:
        return <UnsupportedView objectKey={key} />;
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
        height: '100vw',
      }}
    >
      <div>{resolveRenderer()}</div>
      <div>{props?.selectedObject?.key}</div>
      <Button onClick={onCloseObjectPreview}>Close</Button>
    </div>
  );
};
