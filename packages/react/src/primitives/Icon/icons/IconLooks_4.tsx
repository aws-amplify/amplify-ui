import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconLooks_4 } from '@aws-amplify/ui-react';` → `import { MdLooks_4 } from 'react-icons/md';`
 */
export const IconLooks_4 = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconLooks_4');
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
        <g clip-path="url(#clip0_1020_40474)">
          <path
            d="M19.04 3H5.04004C3.94004 3 3.04004 3.9 3.04004 5V19C3.04004 20.1 3.94004 21 5.04004 21H19.04C20.14 21 21.04 20.1 21.04 19V5C21.04 3.9 20.14 3 19.04 3ZM19.04 19H5.04004V5H19.04V19ZM13.04 17H15.04V7H13.04V11H11.04V7H9.04004V13H13.04V17Z"
            fill="currentColor"
          />
        </g>
        <defs>
          <clipPath id="clip0_1020_40474">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </View>
  );
};
