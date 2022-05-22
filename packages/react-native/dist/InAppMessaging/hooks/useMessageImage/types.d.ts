export declare type ImageDimensions = {
    height: number | null;
    width: number | null;
};
export declare type ImageLoadingState = 'loaded' | 'failed';
export declare enum ImagePrefetchStatus {
    INITIAL = "INITIAL",
    FETCHING = "FETCHING",
    SUCCESS = "SUCCESS",
    FAILURE = "FAILURE"
}
export declare type UseMessageImage = {
    hasRenderableImage: boolean;
    imageDimensions: ImageDimensions;
    isImageFetching: boolean;
};
