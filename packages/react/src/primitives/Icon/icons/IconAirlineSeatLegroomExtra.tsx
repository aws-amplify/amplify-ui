import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconAirlineSeatLegroomExtra } from '@aws-amplify/ui-react';` → `import { MdAirlineSeatLegroomExtra } from 'react-icons/md';`
 */
export const IconAirlineSeatLegroomExtra = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconAirlineSeatLegroomExtra');
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
          d="M4 12V3H2V12C2 14.76 4.24 17 7 17H13V15H7C5.34 15 4 13.66 4 12ZM22.83 17.24C22.45 16.52 21.54 16.27 20.8 16.61L19.71 17.11L16.3 10.13C15.96 9.45 15.27 9 14.51 9H11V3H5V11C5 12.66 6.34 14 8 14H15L18.41 21L22.13 19.3C22.9 18.94 23.23 18 22.83 17.24Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
