import React from 'react';
import { classNames, ComponentClassName } from '@aws-amplify/ui';
import { Image } from '@aws-amplify/ui-react';
import { STORAGE_BROWSER_BLOCK } from '../constants';

export function ImagePreview({
  url,
  fileKey,
}: {
  url: string | null;
  fileKey: string;
}): React.JSX.Element | null {
  return (
    <Image
      className={classNames(
        ComponentClassName.StorageImage,
        `${STORAGE_BROWSER_BLOCK}__image-preview`
      )}
      src={url!}
      alt={fileKey}
      style={{
        height: '400px',
      }}
    />
  );
}
