import { Image } from 'react-native';
import { ConsoleLogger as Logger } from 'aws-amplify/utils';
import { InAppMessageLayout } from '@aws-amplify/ui-react-core-notifications';

import {
  BANNER_IMAGE_SCREEN_SIZE,
  CAROUSEL_IMAGE_SCREEN_SIZE,
  FULL_SCREEN_IMAGE_SCREEN_SIZE,
  MODAL_IMAGE_SCREEN_SIZE,
} from './constants';
import { ImageDimensions, ImageLoadingState } from './types';

const logger = new Logger('InAppMessaging');

const inAppMessageImageSizes: Record<InAppMessageLayout, number> = {
  BOTTOM_BANNER: BANNER_IMAGE_SCREEN_SIZE,
  MIDDLE_BANNER: BANNER_IMAGE_SCREEN_SIZE,
  TOP_BANNER: BANNER_IMAGE_SCREEN_SIZE,
  CAROUSEL: CAROUSEL_IMAGE_SCREEN_SIZE,
  FULL_SCREEN: FULL_SCREEN_IMAGE_SCREEN_SIZE,
  MODAL: MODAL_IMAGE_SCREEN_SIZE,
};

export const prefetchNetworkImage = async (
  url: string
): Promise<ImageLoadingState> => {
  try {
    const loaded = await Image.prefetch(url);
    if (loaded) {
      return 'loaded';
    }

    logger.error(`Image failed to load: ${url}`);
    return 'failed';
  } catch (e) {
    logger.error(`Image.prefetch failed: ${e}`);
    return 'failed';
  }
};

export const getLayoutImageDimensions = (
  imageHeight: number,
  imageWidth: number,
  layout: InAppMessageLayout
): ImageDimensions => {
  // determine aspect ratio for scaling rendered image
  const aspectRatio = imageWidth / imageHeight;
  const isSquare = aspectRatio === 1;
  const isPortrait = imageHeight > imageWidth;
  const isLandscape = imageWidth > imageHeight;

  // an image that has smaller dimensions than the max image dimension (e.g. 10px x 10px)
  // will be scaled up in size to match the size the message component expects.
  // While this could lead to pixelated images, it was ultimately a product decision,
  // ideally the message creator would follow the image guidelines in the pinpoint console
  const maxImageDimension = inAppMessageImageSizes[layout];

  let height: ImageDimensions['height'] = undefined;
  let width: ImageDimensions['width'] = undefined;

  // set square image dimensions
  if (isSquare) {
    height = maxImageDimension;
    width = maxImageDimension;
  }

  // set portrait image dimensions
  if (isPortrait) {
    height = maxImageDimension;
    width = maxImageDimension * aspectRatio;
  }

  // set landscape image dimensions
  if (isLandscape) {
    height = maxImageDimension / aspectRatio;
    width = maxImageDimension;
  }

  return { height, width };
};
