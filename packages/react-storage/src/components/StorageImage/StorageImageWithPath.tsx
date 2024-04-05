import * as React from 'react';

import { classNames, ComponentClassName } from '@aws-amplify/ui';
import { Image } from '@aws-amplify/ui-react';
import { useGetURL } from '@aws-amplify/ui-react/internal';
import { useSetUserAgent } from '@aws-amplify/ui-react-core';

import { VERSION } from '../../version';
import type { StorageImagePathProps } from './types';

export const StorageImageWithPath = ({
  className,
  path,
  onGetUrlError,
  ...rest
}: StorageImagePathProps): JSX.Element => {
  const [imgURL, setImgURL] = React.useState<string>();
  useSetUserAgent({
    componentName: 'StorageImage',
    packageName: 'react-storage',
    version: VERSION,
  });

  // TODO isloading
  const { url } = useGetURL({
    path,
    onError: onGetUrlError,
  });

  React.useEffect(() => {
    if (url) {
      setImgURL(url.toString());
    }
  }, [url]);

  return (
    <Image
      {...rest}
      className={classNames(ComponentClassName.StorageImage, className)}
      src={imgURL}
    />
  );
};
