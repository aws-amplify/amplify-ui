import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconPhoneMissed } from '@aws-amplify/ui-react';` → `import { MdPhoneMissed } from 'react-icons/md';`
 */
export const IconPhoneMissed = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconPhoneMissed } from '@aws-amplify/ui-react'; → import { MdPhoneMissed } from 'react-icons/md';`,
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
        <g clip-path="url(#clip0_1020_41475)">
          <path
            d="M23.71 16.6699C20.66 13.7799 16.54 11.9999 12 11.9999C7.46 11.9999 3.34 13.7799 0.29 16.6699C0.11 16.8499 0 17.0999 0 17.3799C0 17.6599 0.11 17.9099 0.29 18.0899L2.77 20.5699C2.95 20.7499 3.2 20.8599 3.48 20.8599C3.75 20.8599 4 20.7499 4.18 20.5799C4.97 19.8399 5.87 19.2199 6.84 18.7299C7.17 18.5699 7.4 18.2299 7.4 17.8299V14.7299C8.85 14.2499 10.4 13.9999 12 13.9999C13.6 13.9999 15.15 14.2499 16.6 14.7199V17.8199C16.6 18.2099 16.83 18.5599 17.16 18.7199C18.14 19.2099 19.03 19.8399 19.83 20.5699C20.01 20.7499 20.26 20.8499 20.53 20.8499C20.81 20.8499 21.06 20.7399 21.24 20.5599L23.72 18.0799C23.9 17.8999 24.01 17.6499 24.01 17.3699C24.01 17.0899 23.89 16.8499 23.71 16.6699V16.6699ZM5.4 17.2299C4.74 17.5999 4.11 18.0299 3.53 18.4999L2.46 17.4299C3.37 16.6799 4.36 16.0399 5.41 15.5299V17.2299H5.4ZM20.48 18.4899C19.88 18.0099 19.26 17.5899 18.6 17.2199V15.5199C19.65 16.0299 20.63 16.6699 21.55 17.4199L20.48 18.4899ZM7 6.42988L11.94 11.3699L19.01 4.29988L17.6 2.87988L11.94 8.53988L8.4 4.99988H11V2.99988H5V8.99988H7V6.42988Z"
            fill="currentColor"
          />
        </g>
        <defs>
          <clipPath id="clip0_1020_41475">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </View>
  );
};
