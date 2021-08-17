/// <reference types="react" />
import { Property } from 'csstype';
interface RatingMixedIconProps {
  emptyColor: Property.Color;
  emptyIcon: JSX.Element;
  fillColor: Property.Color;
  fillIcon: JSX.Element;
  value: number;
}
export declare const RatingMixedIcon: React.FC<RatingMixedIconProps>;
export {};
