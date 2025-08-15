import React from 'react';
import { classNames, ComponentClassName } from '@aws-amplify/ui';
import { Image } from '@aws-amplify/ui-react';

export function ImagePreview({
  url,
  fileKey,
}: {
  url: string | null;
  fileKey: string;
}): React.JSX.Element | null {
  return (
    <Image
      className={classNames(ComponentClassName.StorageImage)}
      src={url!}
      alt={fileKey}
    />
  );
}
