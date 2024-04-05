import { StorageImageWithPath } from './StorageImageWithPath';
import { StorageImageWithKey } from './StorageImageWithKey';
import type { StorageImageProps, StorageImagePathProps } from './types';

interface StorageImage {
  (props: StorageImageProps): JSX.Element;
  (props: StorageImagePathProps): JSX.Element;
  (props: StorageImageProps | StorageImagePathProps): JSX.Element;
}

function isStorageImagePathProps(
  props: StorageImageProps | StorageImagePathProps
): props is StorageImagePathProps {
  return !!(props as StorageImagePathProps)?.path;
}

export const StorageImage = (
  props: StorageImageProps | StorageImagePathProps
): JSX.Element => {
  return isStorageImagePathProps(props)
    ? StorageImageWithPath(props)
    : StorageImageWithKey(props);
};
