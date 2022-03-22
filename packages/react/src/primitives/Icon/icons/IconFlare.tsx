import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconFlare } from '@aws-amplify/ui-react';` → `import { MdFlare } from 'react-icons/md';`
 */
export const IconFlare = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconFlare } from '@aws-amplify/ui-react'; → import { MdFlare } from 'react-icons/md';`,
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
          d="M7 11H1V13H7V11ZM9.17 7.76L7.05 5.64L5.64 7.05L7.76 9.17L9.17 7.76ZM13 1H11V7H13V1ZM18.36 7.05L16.95 5.64L14.83 7.76L16.24 9.17L18.36 7.05ZM17 11V13H23V11H17ZM12 9C10.34 9 9 10.34 9 12C9 13.66 10.34 15 12 15C13.66 15 15 13.66 15 12C15 10.34 13.66 9 12 9ZM14.83 16.24L16.95 18.36L18.36 16.95L16.24 14.83L14.83 16.24V16.24ZM5.64 16.95L7.05 18.36L9.17 16.24L7.76 14.83L5.64 16.95V16.95ZM11 23H13V17H11V23Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
