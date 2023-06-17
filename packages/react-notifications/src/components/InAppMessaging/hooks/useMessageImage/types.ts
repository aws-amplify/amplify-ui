export enum ImagePrefetchStatus {
  Aborted = 'ABORTED',
  Failure = 'FAILURE',
  Fetching = 'FETCHING',
  Success = 'SUCCESS',
}

export type UseMessageImage = {
  hasRenderableImage: boolean;
  isImageFetching: boolean;
};
