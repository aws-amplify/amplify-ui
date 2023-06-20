import { Property } from 'csstype';

import { ElementType, PrimitiveProps, BaseViewProps } from './view';
import { ResponsiveStyle } from './style';

export interface ImageStyleProps {
  /**
   * @description
   *  Sets how the content of an <img> should be resized to fit its container
   */
  objectFit?: ResponsiveStyle<Property.ObjectFit>;

  /**
   * @description
   *  Specifies the alignment of the selected replaced element's contents within the element's box
   */
  objectPosition?: ResponsiveStyle<Property.ObjectPosition>;
}

export interface ImageOptions extends ImageStyleProps {
  /**
   * @description
   * Alternative text description of the image (required).
   * @see
   *[MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-alt)
   */
  alt: React.ImgHTMLAttributes<HTMLImageElement>['alt'];

  /**
   * @description
   * Set of image source sizes.
   * @see
   *[MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-sizes)
   */
  sizes?: React.ImgHTMLAttributes<HTMLImageElement>['sizes'];

  /**
   * @description
   * URl source for image (required).
   */
  src: React.ImgHTMLAttributes<HTMLImageElement>['src'];

  /**
   * @description
   * Possible image sources for the browser to use.
   * @see
   *[MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-srcset)
   */
  srcSet?: React.ImgHTMLAttributes<HTMLImageElement>['srcSet'];

  /**
   * @description
   * Handles loading event on image.
   */
  onLoad?(event: React.SyntheticEvent<HTMLImageElement, Event>): void;

  /**
   * @description
   * Handles error events on image.
   */
  onError?(error: string | React.SyntheticEvent<HTMLImageElement, Event>): void;
}

export interface BaseImageProps extends BaseViewProps, ImageOptions {}

export type ImageProps<Element extends ElementType = 'img'> = PrimitiveProps<
  BaseImageProps,
  Element
>;
