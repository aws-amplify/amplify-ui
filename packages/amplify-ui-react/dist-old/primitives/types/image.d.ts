/// <reference types="react" />
import { Property } from 'csstype';
import { BaseComponentProps } from './base';
import { BaseStyleProps } from './style';
export interface ImageStyleProps {
  objectFit?: Property.ObjectFit;
  objectPosition?: Property.ObjectPosition;
}
export interface ImageOptions extends ImageStyleProps {
  /**
   * Alternative text description of the image (required)
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-alt
   */
  alt: React.ImgHTMLAttributes<HTMLImageElement>['alt'];
  /**
   * Set of image source sizes
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-sizes
   */
  sizes?: React.ImgHTMLAttributes<HTMLImageElement>['sizes'];
  /**
   * URl source for image (required)
   */
  src: React.ImgHTMLAttributes<HTMLImageElement>['src'];
  /**
   * Possible image sources for the browser to use
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-srcset
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
export interface ImageProps
  extends ImageOptions,
    BaseComponentProps,
    BaseStyleProps {}
