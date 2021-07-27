import { BaseComponentProps } from './base';
import { BaseStyleProps } from './style';

export interface RatingProps extends BaseComponentProps, BaseStyleProps {
    /**
     * The value of the rating
     */
     value?: number;
     
     /**
      * The max rating
      * Default is 5
      */
     maxValue?: number;
     
     /**
      *
      * This will set the icon size of the stars
      */
     size?: "small" | "medium" | "large"
     
     /**
      * This will override which icon to use as the filled icon
      */
     filledIcon?: JSX.Element;
     
     
     /**
      * This will override which icon to use as the empty icon
      */
     emptyIcon?: JSX.Element;
}
