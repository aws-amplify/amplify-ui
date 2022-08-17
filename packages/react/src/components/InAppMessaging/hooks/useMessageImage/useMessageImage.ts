import { useEffect, useState } from 'react';
import { MessageImage } from '@aws-amplify/ui-react-core';

import { ConsoleLogger as Logger } from '@aws-amplify/core';

import { ImagePrefetchStatus, UseMessageImage } from './types';

const logger = new Logger('Notifications.InAppMessaging');

/**
 * Handles prefetching for message images
 *
 * @param image contains image source
 * @returns message image dimensions and fetching related booleans
 */
export default function useMessageImage(
  image: MessageImage | undefined
): UseMessageImage {
  const { src } = image ?? {};
  const shouldPrefetch = !!src;

  // set initial status to fetching if prefetch is required
  const [prefetchStatus, setPrefetchStatus] =
    useState<ImagePrefetchStatus | null>(
      shouldPrefetch ? ImagePrefetchStatus.Fetching : null
    );

  const isImageFetching = prefetchStatus === ImagePrefetchStatus.Fetching;
  const hasRenderableImage = prefetchStatus === ImagePrefetchStatus.Success;

  useEffect(() => {
    if (!shouldPrefetch) {
      return;
    }

    const img = new Image();

    img.onload = () => {
      setPrefetchStatus(ImagePrefetchStatus.Success);
    };

    img.onabort = () => {
      logger.error(`Image load aborted: ${src}`);
      setPrefetchStatus(ImagePrefetchStatus.Aborted);
    };

    img.onerror = () => {
      logger.error(`Image failed to load: ${src}`);
      setPrefetchStatus(ImagePrefetchStatus.Failure);
    };

    img.src = src;
  }, [shouldPrefetch, src]);

  return { hasRenderableImage, isImageFetching };
}
