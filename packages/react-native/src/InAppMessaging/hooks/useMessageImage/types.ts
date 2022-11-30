export type ImageDimensions = {
  height: number | undefined;
  width: number | undefined;
};

export type ImageLoadingState = 'loaded' | 'failed';

export enum ImagePrefetchStatus {
  Failure = 'FAILURE',
  Fetching = 'FETCHING',
  Success = 'SUCCESS',
}

export type UseMessageImage = {
  hasRenderableImage: boolean;
  imageDimensions: ImageDimensions;
  isImageFetching: boolean;
};
