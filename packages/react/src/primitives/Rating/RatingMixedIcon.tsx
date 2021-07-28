import classNames from 'classnames';
import { View } from '@aws-amplify/ui-react';
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
    <View as="span" className={classNames(`amplify-ui-rating-icon-container`)}>
      <View as="label" className={classNames(`amplify-ui-rating-label`)}>
        <View
          as="span"
          className={classNames(
            `amplify-ui-rating-icon`,
            `amplify-rating-icon-empty`
          )}
          color={emptyColor}
        >
          {emptyIcon}
        </View>
      </View>
      <View
        as="label"
        className={classNames(`amplify-ui-rating-label`)}
        width={widthPercentage}
      >
        <View
          as="span"
          className={classNames(
            `amplify-ui-rating-icon`,
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
