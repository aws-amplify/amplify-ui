import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconAirlineSeatLegroomNormal } from '@aws-amplify/ui-react';` → `import { MdAirlineSeatLegroomNormal } from 'react-icons/md';`
 */
export const IconAirlineSeatLegroomNormal = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconAirlineSeatLegroomNormal } from '@aws-amplify/ui-react'; → import { MdAirlineSeatLegroomNormal } from 'react-icons/md';`,
  });
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
          d="M5 12V3H3V12C3 14.76 5.24 17 8 17H14V15H8C6.34 15 5 13.66 5 12ZM20.5 18H19V11C19 9.9 18.1 9 17 9H12V3H6V11C6 12.65 7.35 14 9 14H16V21H20.5C21.33 21 22 20.33 22 19.5C22 18.67 21.33 18 20.5 18Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
