import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconFlightTakeoff } from '@aws-amplify/ui-react';` → `import { MdFlightTakeoff } from 'react-icons/md';`
 */
export const IconFlightTakeoff = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconFlightTakeoff } from '@aws-amplify/ui-react'; → import { MdFlightTakeoff } from 'react-icons/md';`,
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
          d="M2.5 18.9998H21.5V20.9998H2.5V18.9998ZM22.07 9.63982C21.86 8.83982 21.03 8.35982 20.23 8.57982L14.92 9.99982L8.02 3.56982L6.09 4.07982L10.23 11.2498L5.26 12.5798L3.29 11.0398L1.84 11.4298L4.43 15.9198L21 11.4898C21.81 11.2598 22.28 10.4398 22.07 9.63982Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
