import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';

export const IconTextRotationAngleup = (props) => {
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
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16.76 8.99998L18.17 10.41L8.98 19.6L10.39 21.01L19.58 11.82L21 13.24V8.99998H16.76V8.99998ZM8.48 12.75L12.02 9.20998L14.21 10.13L15.69 8.64998L4.56 4.22998L3.5 5.28998L7.92 16.43L9.4 14.95L8.48 12.75V12.75ZM7.66 11.03L5.43 6.15998L10.3 8.38998L7.66 11.03V11.03Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
