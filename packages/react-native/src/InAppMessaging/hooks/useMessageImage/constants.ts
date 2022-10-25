import { Dimensions } from 'react-native';

// as images are not expected to be responsive to orientation changes get screen dimensions at app start
const SCREEN_DIMENSIONS = Dimensions.get('screen');

// compare screen width and height and assign the lesser of the two as the base screen dimension
const BASE_SCREEN_DIMENSION =
  SCREEN_DIMENSIONS.width < SCREEN_DIMENSIONS.height
    ? SCREEN_DIMENSIONS.width
    : SCREEN_DIMENSIONS.height;

// base size that message images should fill
// - all banner message images should fill 20 percent of the base screen dimension
// - all other components should fill 60 percent of the base screen dimension
export const BANNER_IMAGE_SCREEN_MULTIPLIER = 0.2;
export const CAROUSEL_IMAGE_SCREEN_MULTIPLIER = 0.6;
export const FULL_SCREEN_IMAGE_SCREEN_MULTIPLIER = 0.6;
export const MODAL_IMAGE_SCREEN_MULTIPLIER = 0.6;

export const BANNER_IMAGE_SCREEN_SIZE =
  BANNER_IMAGE_SCREEN_MULTIPLIER * BASE_SCREEN_DIMENSION;
export const CAROUSEL_IMAGE_SCREEN_SIZE =
  CAROUSEL_IMAGE_SCREEN_MULTIPLIER * BASE_SCREEN_DIMENSION;
export const FULL_SCREEN_IMAGE_SCREEN_SIZE =
  FULL_SCREEN_IMAGE_SCREEN_MULTIPLIER * BASE_SCREEN_DIMENSION;
export const MODAL_IMAGE_SCREEN_SIZE =
  MODAL_IMAGE_SCREEN_MULTIPLIER * BASE_SCREEN_DIMENSION;
