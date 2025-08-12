import React from 'react';
import { classNames, ComponentClassName } from '@aws-amplify/ui';
import { Image } from '@aws-amplify/ui-react';

export function ImagePreview({
  url,
  objectKey,
}: {
  url: string | null;
  objectKey: string;
}): React.JSX.Element | null {
  return (
    <Image
      className={classNames(ComponentClassName.StorageImage)}
      src={url!}
      alt={objectKey}
    />
  );
}
