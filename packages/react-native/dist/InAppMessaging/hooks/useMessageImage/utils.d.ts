import { InAppMessageLayout } from '@aws-amplify/notifications';
import { ImageDimensions, ImageLoadingState } from './types';
export declare const prefetchNetworkImage: (url: string) => Promise<ImageLoadingState>;
export declare const getLayoutImageDimensions: (imageHeight: number, imageWidth: number, layout: InAppMessageLayout) => ImageDimensions;
