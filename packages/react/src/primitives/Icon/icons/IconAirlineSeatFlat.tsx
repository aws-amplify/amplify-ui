import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconAirlineSeatFlat } from '@aws-amplify/ui-react';` → `import { MdAirlineSeatFlat } from 'react-icons/md';`
 */
export const IconAirlineSeatFlat = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconAirlineSeatFlat } from '@aws-amplify/ui-react'; → import { MdAirlineSeatFlat } from 'react-icons/md';`,
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
          d="M5 13C5.78 13 6.55 12.7 7.14 12.1C8.3 10.91 8.28 9.02 7.1 7.86C6.51 7.29 5.75 7 5 7C4.22 7 3.45 7.3 2.86 7.9C1.7 9.09 1.72 10.98 2.9 12.14C3.49 12.71 4.25 13 5 13ZM4.29 9.3C4.48 9.11 4.73 9 5 9C5.26 9 5.51 9.1 5.7 9.28C6.1 9.67 6.1 10.29 5.72 10.69C5.52 10.89 5.27 11 5 11C4.74 11 4.49 10.9 4.3 10.72C3.9 10.32 3.9 9.7 4.29 9.3ZM18 7H9V13H22V11C22 8.79 20.21 7 18 7ZM11 11V9H18C19.1 9 20 9.9 20 11H11ZM2 16H8V18H16V16H22V14H2V16Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
