import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconDirectionsOff } from '@aws-amplify/ui-react';` → `import { MdDirectionsOff } from 'react-icons/md';`
 */
export const IconDirectionsOff = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconDirectionsOff } from '@aws-amplify/ui-react'; → import { MdDirectionsOff } from 'react-icons/md';`,
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
          d="M21.71 11.2901L12.71 2.29006C12.32 1.90006 11.69 1.90006 11.3 2.29006L8.20996 5.38006L9.61996 6.79006L12 4.42006L19.58 12.0001L17.2 14.3801L18.61 15.7901L21.7 12.7001C22.1 12.3301 22.1 11.7001 21.71 11.2901Z"
          fill="currentColor"
        />
        <path d="M13 7.5V10.17L15.17 12.34L16.5 11L13 7.5Z" fill="black" />
        <path
          d="M1.39014 4.22006L5.38014 8.21006L2.29014 11.3001C1.90014 11.6901 1.90014 12.3201 2.29014 12.7101L11.2901 21.7101C11.6801 22.1001 12.3101 22.1001 12.7001 21.7101L15.7901 18.6201L19.7801 22.6101L21.1901 21.2001L2.81014 2.81006L1.39014 4.22006ZM8.03014 10.8501C8.02014 10.9001 7.99014 10.9501 7.99014 11.0001V15.0001H9.99014V12.8201L14.3701 17.2001L12.0001 19.5801L4.42014 12.0001L6.80014 9.62006L8.03014 10.8501Z"
          fill="black"
        />
      </svg>
    </View>
  );
};
