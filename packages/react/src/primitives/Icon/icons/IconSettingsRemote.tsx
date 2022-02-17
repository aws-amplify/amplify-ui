import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconSettingsRemote } from '@aws-amplify/ui-react';` → `import { MdSettingsRemote } from 'react-icons/md';`
 */
export const IconSettingsRemote = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconSettingsRemote');
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
          d="M15 9H9C8.45 9 8 9.45 8 10V22C8 22.55 8.45 23 9 23H15C15.55 23 16 22.55 16 22V10C16 9.45 15.55 9 15 9ZM14 21H10V11H14V21Z"
          fill="currentColor"
        />
        <path
          d="M12 14C12.5523 14 13 13.5523 13 13C13 12.4477 12.5523 12 12 12C11.4477 12 11 12.4477 11 13C11 13.5523 11.4477 14 12 14Z"
          fill="black"
        />
        <path
          d="M7.05 6.05L8.46 7.46C9.37 6.56 10.62 6 12 6C13.38 6 14.63 6.56 15.54 7.46L16.95 6.05C15.68 4.78 13.93 4 12 4C10.07 4 8.32 4.78 7.05 6.05ZM12 0C8.96 0 6.21 1.23 4.22 3.22L5.63 4.63C7.26 3.01 9.51 2 12 2C14.49 2 16.74 3.01 18.36 4.64L19.77 3.23C17.79 1.23 15.04 0 12 0Z"
          fill="black"
        />
      </svg>
    </View>
  );
};
