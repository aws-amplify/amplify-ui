import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconElectricCar } from '@aws-amplify/ui-react';` → `import { MdElectricCar } from 'react-icons/md';`
 */
export const IconElectricCar = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconElectricCar } from '@aws-amplify/ui-react'; → import { MdElectricCar } from 'react-icons/md';`,
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
          d="M18.92 2.01C18.72 1.42 18.16 1 17.5 1H6.5C5.84 1 5.29 1.42 5.08 2.01L3 8V16C3 16.55 3.45 17 4 17H5C5.55 17 6 16.55 6 16V15H18V16C18 16.55 18.45 17 19 17H20C20.55 17 21 16.55 21 16V8L18.92 2.01ZM6.85 3H17.14L18.22 6.11H5.77L6.85 3ZM19 13H5V8H19V13Z"
          fill="currentColor"
        />
        <path
          d="M7.5 12C8.32843 12 9 11.3284 9 10.5C9 9.67157 8.32843 9 7.5 9C6.67157 9 6 9.67157 6 10.5C6 11.3284 6.67157 12 7.5 12Z"
          fill="black"
        />
        <path
          d="M16.5 12C17.3284 12 18 11.3284 18 10.5C18 9.67157 17.3284 9 16.5 9C15.6716 9 15 9.67157 15 10.5C15 11.3284 15.6716 12 16.5 12Z"
          fill="black"
        />
        <path d="M7 20H11V18L17 21H13V23L7 20Z" fill="black" />
      </svg>
    </View>
  );
};
