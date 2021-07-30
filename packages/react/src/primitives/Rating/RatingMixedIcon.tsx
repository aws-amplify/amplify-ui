import classNames from 'classnames';
import { View } from '../View';
import { Property } from 'csstype';

export const createMixedIcon = (
  fillIcon: JSX.Element,
  emptyIcon: JSX.Element,
  value: number,
  fillColor: Property.Color,
  emptyColor: Property.Color
) => {
  const widthPercentage = `${(value % 1) * 100}%`;
  return (
    <View as="span" className={classNames(`amplify-rating-icon-container`)}>
      <View as="label" className={classNames(`amplify-rating-label`)}>
        <View
          as="span"
          className={classNames(
            `amplify-rating-icon`,
            `amplify-rating-icon-empty`
          )}
          color={emptyColor}
        >
          {emptyIcon}
        </View>
      </View>
      <View
        as="label"
        className={classNames(`amplify-rating-label`)}
        width={widthPercentage}
      >
        <View
          as="span"
          className={classNames(
            `amplify-rating-icon`,
            `amplify-rating-icon-filled`
          )}
          color={fillColor}
        >
          {fillIcon}
        </View>
      </View>
      <span className={`hidden`}>{`${value} stars`}</span>
    </View>
  );
};
