import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconAirlineSeatFlatAngled } from '@aws-amplify/ui-react';` → `import { MdAirlineSeatFlatAngled } from 'react-icons/md';`
 */
export const IconAirlineSeatFlatAngled = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconAirlineSeatFlatAngled } from '@aws-amplify/ui-react'; → import { MdAirlineSeatFlatAngled } from 'react-icons/md';`,
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
          d="M6 6.5C6.31 6.5 6.7 6.65 6.9 7.06C7.14 7.56 6.92 8.16 6.43 8.4C6.29 8.46 6.15 8.5 6 8.5C5.7 8.5 5.3 8.35 5.11 7.94C4.94 7.6 5.01 7.31 5.06 7.16C5.11 7.02 5.24 6.76 5.57 6.6C5.71 6.54 5.85 6.5 6 6.5V6.5ZM12.47 8.61L19.16 11.02C19.68 11.21 20.09 11.58 20.31 12.07C20.53 12.55 20.56 13.1 20.37 13.6L20.36 13.62L11.77 10.51L12.47 8.61V8.61ZM10 15.19L14 16.63V17H10V15.19ZM6 4.5C5.56 4.5 5.12 4.6 4.7 4.8C3.21 5.51 2.58 7.3 3.3 8.8C3.81 9.87 4.88 10.5 6 10.5C6.44 10.5 6.88 10.4 7.3 10.2C8.79 9.48 9.42 7.69 8.71 6.2C8.19 5.13 7.12 4.5 6 4.5ZM11.28 6.05L9.2 11.71L21.56 16.18L22.25 14.29C23.02 12.2 21.94 9.9 19.84 9.14L11.28 6.05V6.05ZM2.19 10.25L1.5 12.14L8 14.48V19H16V17.37L20.52 19L21.21 17.11L2.19 10.25Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
