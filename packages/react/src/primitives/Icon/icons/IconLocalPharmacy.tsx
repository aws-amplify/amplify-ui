import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';

export const IconLocalPharmacy = (props) => {
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
          d="M21 5H18.36L19.5 1.86L17.15 1L15.69 5H3V7L5 13L3 19V21H21V19L19 13L21 7V5ZM17.1 13.63L18.89 19H5.11L6.9 13.63L7.11 13L6.9 12.37L5.11 7H18.89L17.1 12.37L16.89 13L17.1 13.63V13.63ZM13 9H11V12H8V14H11V17H13V14H16V12H13V9Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
