import classNames from 'classnames';
import { Property } from 'csstype';

import { View } from '../View';
import { StyleToken } from '../types/style';

interface RatingMixedIconProps {
  emptyColor: StyleToken<Property.Color>;
  emptyIcon: JSX.Element;
  fillColor: StyleToken<Property.Color>;
  fillIcon: JSX.Element;
  value: number;
}

export const RatingMixedIcon: React.FC<RatingMixedIconProps> = ({
  emptyColor,
  emptyIcon,
  fillColor,
  fillIcon,
  value,
}) => {
  const widthPercentage = `${(value % 1) * 100}%`;
  return (
    <View as="span" className="amplify-rating-icon-container">
      <View as="span" className="amplify-rating-label">
        <View
          as="span"
          className={classNames(
            'amplify-rating-icon',
            'amplify-rating-icon-empty'
          )}
          color={emptyColor}
        >
          {emptyIcon}
        </View>
      </View>
      <View as="span" className="amplify-rating-label" width={widthPercentage}>
        <View
          as="span"
          className={classNames(
            'amplify-rating-icon',
            'amplify-rating-icon-filled'
          )}
          color={fillColor}
        >
          {fillIcon}
        </View>
      </View>
    </View>
  );
};

RatingMixedIcon.displayName = 'RatingMixedIcon';
