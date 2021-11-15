import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';

export const IconDomainVerification = (props) => {
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
          d="M16.6 10.88L15.18 9.45996L10.94 13.71L8.82002 11.58L7.40002 13L10.94 16.54L16.6 10.88Z"
          fill="currentColor"
        />
        <path
          d="M19 4H5C3.89 4 3 4.9 3 6V18C3 19.1 3.89 20 5 20H19C20.1 20 21 19.1 21 18V6C21 4.9 20.11 4 19 4ZM19 18H5V8H19V18Z"
          fill="black"
        />
      </svg>
    </View>
  );
};
