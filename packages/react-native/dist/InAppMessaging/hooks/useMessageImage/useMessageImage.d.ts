import { InAppMessageImage, InAppMessageLayout } from '@aws-amplify/notifications';
import { UseMessageImage } from './types';
/**
 * Handles prefetching and dimension setting for message images
 *
 * @param {InAppMessageImage} image - contains image source
 * @param {InAppMessageLayout} layout - message layout
 * @returns {UseMessageImage} message image dimensions and rendering related booleans
 */
export default function useMessageImage(image: InAppMessageImage | undefined, layout: InAppMessageLayout): UseMessageImage;
