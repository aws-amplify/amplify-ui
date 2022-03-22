import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconPublicOff } from '@aws-amplify/ui-react';` → `import { MdPublicOff } from 'react-icons/md';`
 */
export const IconPublicOff = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconPublicOff } from '@aws-amplify/ui-react'; → import { MdPublicOff } from 'react-icons/md';`,
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
          d="M11.0001 8.17L6.49014 3.66C8.07014 2.61 9.96014 2 12.0001 2C17.5201 2 22.0001 6.48 22.0001 12C22.0001 14.04 21.3901 15.93 20.3401 17.51L18.8801 16.05C19.5901 14.87 20.0001 13.48 20.0001 12C20.0001 8.65 17.9301 5.78 15.0001 4.59V5C15.0001 6.1 14.1001 7 13.0001 7H11.0001V8.17ZM21.1901 21.19L19.7801 22.6L17.5101 20.33C15.9301 21.39 14.0401 22 12.0001 22C6.48014 22 2.00014 17.52 2.00014 12C2.00014 9.96 2.61014 8.07 3.66014 6.49L1.39014 4.22L2.80014 2.81L21.1901 21.19ZM11.0001 18C9.90014 18 9.00014 17.1 9.00014 16V15L4.21014 10.21C4.08014 10.79 4.00014 11.38 4.00014 12C4.00014 16.08 7.05014 19.44 11.0001 19.93V18Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
