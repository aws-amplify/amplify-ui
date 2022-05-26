import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconHourglassDisabled } from '@aws-amplify/ui-react';` → `import { MdHourglassDisabled } from 'react-icons/md';`
 */
export const IconHourglassDisabled = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconHourglassDisabled } from '@aws-amplify/ui-react'; → import { MdHourglassDisabled } from 'react-icons/md';`,
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
          d="M8 4H16V7.5L13.16 10.34L14.41 11.59L18 8.01L17.99 8H18V2H6V3.17L8 5.17V4Z"
          fill="currentColor"
        />
        <path
          d="M2.1 2.1001L0.690002 3.5101L9.59 12.4101L6 16.0001L6.01 16.0101H6V22.0001H18V20.8301L20.49 23.3201L21.9 21.9101L2.1 2.1001ZM16 20.0001H8V16.5001L10.84 13.6601L16 18.8301V20.0001Z"
          fill="black"
        />
      </svg>
    </View>
  );
};
