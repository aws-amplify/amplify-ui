export type ImageDimensions = {
  height: number | undefined;
  width: number | undefined;
};

export type ImageLoadingState = 'loaded' | 'failed';

export enum ImagePrefetchStatus {
  Initial = 'INITIAL',
  Fetching = 'FETCHING',
  Success = 'SUCCESS',
  Failure = 'FAILURE',
}

export type UseMessageImage = {
  hasRenderableImage: boolean;
  imageDimensions: ImageDimensions;
  isImageFetching: boolean;
};
