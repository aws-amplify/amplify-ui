import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconNearMeDisabled } from '@aws-amplify/ui-react';` → `import { MdNearMeDisabled } from 'react-icons/md';`
 */
export const IconNearMeDisabled = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconNearMeDisabled } from '@aws-amplify/ui-react'; → import { MdNearMeDisabled } from 'react-icons/md';`,
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
          d="M12.0001 6.3399L21.0001 2.9999L17.6601 11.9999L16.1001 10.4399L17.6001 6.3899L13.5501 7.8899L12.0001 6.3399ZM21.1901 21.1899L16.1201 16.1199L14.3101 20.9999H12.9001L10.0701 13.9299L3.00006 11.0999V9.6899L7.88006 7.8799L2.81006 2.8099L4.22006 1.3999L22.6001 19.7799L21.1901 21.1899ZM14.5701 14.5699L9.43006 9.4299L6.72006 10.4399L11.6101 12.3899L13.5601 17.2799L14.5701 14.5699Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
