import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconNextPlan } from '@aws-amplify/ui-react';` → `import { MdNextPlan } from 'react-icons/md';`
 */
export const IconNextPlan = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconNextPlan } from '@aws-amplify/ui-react'; → import { MdNextPlan } from 'react-icons/md';`,
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
          d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20Z"
          fill="currentColor"
        />
        <path
          d="M15.97 11.03C14.87 9.79 13.28 9 11.5 9C8.67999 9 6.31999 10.95 5.67999 13.56L6.63999 13.88C7.14999 11.66 9.12999 10 11.5 10C13.01 10 14.35 10.68 15.26 11.74L13 14H18V9L15.97 11.03Z"
          fill="black"
        />
      </svg>
    </View>
  );
};
