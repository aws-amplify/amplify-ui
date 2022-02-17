import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconAirplanemodeInactive } from '@aws-amplify/ui-react';` → `import { MdAirplanemodeInactive } from 'react-icons/md';`
 */
export const IconAirplanemodeInactive = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconAirplanemodeInactive');
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
          d="M10.5 7.67V3.5C10.5 2.67 11.17 2 12 2C12.83 2 13.5 2.67 13.5 3.5V9L22 14V16L17.51 14.68L10.5 7.67ZM19.78 22.61L21.19 21.2L13.5 13.5L9.56001 9.56L2.81001 2.81L1.39001 4.22L7.77001 10.6L2.00001 14V16L10.5 13.5V19L8.00001 20.5V22L12 21L16 22V20.5L13.5 19V16.33L19.78 22.61Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
