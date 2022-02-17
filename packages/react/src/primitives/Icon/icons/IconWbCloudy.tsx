import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconWbCloudy } from '@aws-amplify/ui-react';` → `import { MdWbCloudy } from 'react-icons/md';`
 */
export const IconWbCloudy = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconWbCloudy');
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
        <g clip-path="url(#clip0_1020_40666)">
          <path
            d="M12.01 6C14.62 6 16.9 7.86 17.41 10.43L17.71 11.93L19.23 12.04C20.79 12.15 22.01 13.45 22.01 15C22.01 16.65 20.66 18 19.01 18H6.01001C3.80001 18 2.01001 16.21 2.01001 14C2.01001 11.95 3.54001 10.24 5.57001 10.03L6.64001 9.92L7.14001 8.97C8.08001 7.14 9.95001 6 12.01 6ZM12.01 4C9.12001 4 6.60001 5.64 5.35001 8.04C2.35001 8.36 0.0100098 10.91 0.0100098 14C0.0100098 17.31 2.70001 20 6.01001 20H19.01C21.77 20 24.01 17.76 24.01 15C24.01 12.36 21.96 10.22 19.37 10.04C18.68 6.59 15.65 4 12.01 4Z"
            fill="currentColor"
          />
        </g>
        <defs>
          <clipPath id="clip0_1020_40666">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </View>
  );
};
