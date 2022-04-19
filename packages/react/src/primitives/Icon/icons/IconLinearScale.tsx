import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconLinearScale } from '@aws-amplify/ui-react';` → `import { MdLinearScale } from 'react-icons/md';`
 */
export const IconLinearScale = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconLinearScale } from '@aws-amplify/ui-react'; → import { MdLinearScale } from 'react-icons/md';`,
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
          d="M19.5 9.5C18.47 9.5 17.6 10.12 17.21 11H14.29C13.9 10.12 13.03 9.5 12 9.5C10.97 9.5 10.1 10.12 9.71 11H6.79C6.4 10.12 5.53 9.5 4.5 9.5C3.12 9.5 2 10.62 2 12C2 13.38 3.12 14.5 4.5 14.5C5.53 14.5 6.4 13.88 6.79 13H9.71C10.1 13.88 10.97 14.5 12 14.5C13.03 14.5 13.9 13.88 14.29 13H17.21C17.6 13.88 18.47 14.5 19.5 14.5C20.88 14.5 22 13.38 22 12C22 10.62 20.88 9.5 19.5 9.5Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
