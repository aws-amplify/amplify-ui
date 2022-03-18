import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconElectricMoped } from '@aws-amplify/ui-react';` → `import { MdElectricMoped } from 'react-icons/md';`
 */
export const IconElectricMoped = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconElectricMoped } from '@aws-amplify/ui-react'; → import { MdElectricMoped } from 'react-icons/md';`,
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
          d="M19 5C19 3.9 18.1 3 17 3H14V5H17V7.65L13.52 12H10V7H6C3.79 7 2 8.79 2 11V14H4C4 15.66 5.34 17 7 17C8.66 17 10 15.66 10 14H14.48L19 8.35V5ZM4 12V11C4 9.9 4.9 9 6 9H8V12H4ZM7 15C6.45 15 6 14.55 6 14H8C8 14.55 7.55 15 7 15Z"
          fill="currentColor"
        />
        <path d="M10 4H5V6H10V4Z" fill="black" />
        <path
          d="M19 11C17.34 11 16 12.34 16 14C16 15.66 17.34 17 19 17C20.66 17 22 15.66 22 14C22 12.34 20.66 11 19 11ZM19 15C18.45 15 18 14.55 18 14C18 13.45 18.45 13 19 13C19.55 13 20 13.45 20 14C20 14.55 19.55 15 19 15Z"
          fill="black"
        />
        <path d="M7 20H11V18L17 21H13V23L7 20Z" fill="black" />
      </svg>
    </View>
  );
};
