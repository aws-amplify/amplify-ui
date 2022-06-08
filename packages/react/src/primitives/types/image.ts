import { Property } from 'csstype';

import { ViewProps } from './view';
import { ResponsiveStyle } from './style';

export interface ImageStyleProps {
  objectFit?: ResponsiveStyle<Property.ObjectFit>;
  objectPosition?: ResponsiveStyle<Property.ObjectPosition>;
}

export interface ImageOptions extends ImageStyleProps {
  /**
   * @description
   * Alternative text description of the image (required)
   */
  alt: React.ImgHTMLAttributes<HTMLImageElement>['alt'];

  /**
   * @description
   * Set of image source sizes
   */
  sizes?: React.ImgHTMLAttributes<HTMLImageElement>['sizes'];

  /**
   * @description
   * URl source for image (required)
   */
  src: React.ImgHTMLAttributes<HTMLImageElement>['src'];

  /**
   * @description
   * Possible image sources for the browser to use
   */
  srcSet?: React.ImgHTMLAttributes<HTMLImageElement>['srcSet'];

  /**
   * Handles loading event on image
   */
  onLoad?(event: React.SyntheticEvent<HTMLImageElement, Event>): void;

  /**
   * Handles error events on image
   */
  onError?(error: string | React.SyntheticEvent<HTMLImageElement, Event>): void;
}

export interface ImageProps extends ViewProps, ImageOptions {}
