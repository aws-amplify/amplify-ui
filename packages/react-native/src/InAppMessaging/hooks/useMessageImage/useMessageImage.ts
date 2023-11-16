import { useEffect, useRef, useState } from 'react';
import { Image } from 'react-native';
import { ConsoleLogger as Logger } from 'aws-amplify/utils';

import {
  InAppMessageImage,
  InAppMessageLayout,
} from '@aws-amplify/ui-react-core-notifications';

import { ImageDimensions, ImagePrefetchStatus, UseMessageImage } from './types';
import { getLayoutImageDimensions, prefetchNetworkImage } from './utils';

const logger = new Logger('InAppMessaging');

/**
 * Handles prefetching and dimension setting for message images
 *
 * @param image contains image source
 * @param layout message layout
 * @returns message image dimensions and rendering related booleans
 */
export default function useMessageImage(
  image: InAppMessageImage | undefined,
  layout: InAppMessageLayout
): UseMessageImage {
  const { src } = image ?? {};
  const shouldPrefetch = !!src;

  // set initial status to fetching if prefetch is required
  const [prefetchStatus, setPrefetchStatus] =
    useState<ImagePrefetchStatus | null>(
      shouldPrefetch ? ImagePrefetchStatus.Fetching : null
    );
  const imageDimensions = useRef<ImageDimensions>({
    height: undefined,
    width: undefined,
  }).current;

  const isImageFetching = prefetchStatus === ImagePrefetchStatus.Fetching;
  const hasRenderableImage = prefetchStatus === ImagePrefetchStatus.Success;

  useEffect(() => {
    if (!shouldPrefetch) {
      return;
    }

    prefetchNetworkImage(src).then((prefetchResult) => {
      if (prefetchResult === 'loaded') {
        // get image size once loaded
        Image.getSize(
          src,
          (imageWidth, imageHeight) => {
            const { height, width } = getLayoutImageDimensions(
              imageHeight,
              imageWidth,
              layout
            );
            imageDimensions.height = height;
            imageDimensions.width = width;

            setPrefetchStatus(ImagePrefetchStatus.Success);
          },
          (error) => {
            // handle size retrieval error
            logger.error(`Unable to retrieve size for image: ${error}`);
            setPrefetchStatus(ImagePrefetchStatus.Failure);
          }
        );
      } else {
        // handle prefetch failure
        setPrefetchStatus(ImagePrefetchStatus.Failure);
      }
    });
  }, [imageDimensions, layout, shouldPrefetch, src]);

  return { hasRenderableImage, imageDimensions, isImageFetching };
}
