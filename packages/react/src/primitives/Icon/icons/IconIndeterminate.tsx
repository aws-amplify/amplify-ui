import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';

/**
 * @internal For internal Amplify UI use only. May be removed in a future release.
 */
export const IconIndeterminate = (props) => {
  const { className, ...rest } = props;

  return (
    <View
      as="span"
      width="1em"
      height="1em"
      className={classNames(ComponentClassNames.Icon, className)}
      {...rest}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        width="24"
        viewBox="0 0 24 24"
      >
        <line
          x1="4"
          x2="20"
          y1="12"
          y2="12"
          stroke="currentColor"
          strokeWidth="3"
        />
      </svg>
    </View>
  );
};
