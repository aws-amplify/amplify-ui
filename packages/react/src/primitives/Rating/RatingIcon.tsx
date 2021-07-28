import classNames from 'classnames';
import { Property } from 'csstype';
import { View } from '@aws-amplify/ui-react';

export const createIcon = (
  icon: JSX.Element,
  fill: Property.Color,
  className: string
) => {
  return (
    <View as="span" className={classNames(`amplify-ui-rating-icon-container`)}>
      <View as="label" className={classNames(`amplify-ui-rating-label`)}>
        <View as="span" className={classNames(`flex`, className)} color={fill}>
          {icon}
        </View>
      </View>
    </View>
  );
};
