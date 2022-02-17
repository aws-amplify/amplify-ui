import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconAddAlarm } from '@aws-amplify/ui-react';` → `import { MdAddAlarm } from 'react-icons/md';`
 */
export const IconAddAlarm = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconAddAlarm');
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
          d="M7.88 3.38986L6.6 1.85986L2 5.70986L3.29 7.23986L7.88 3.38986ZM22 5.71986L17.4 1.85986L16.11 3.38986L20.71 7.24986L22 5.71986ZM12 3.99986C7.03 3.99986 3 8.02986 3 12.9999C3 17.9699 7.02 21.9999 12 21.9999C16.97 21.9999 21 17.9699 21 12.9999C21 8.02986 16.97 3.99986 12 3.99986ZM12 19.9999C8.13 19.9999 5 16.8699 5 12.9999C5 9.12986 8.13 5.99986 12 5.99986C15.87 5.99986 19 9.12986 19 12.9999C19 16.8699 15.87 19.9999 12 19.9999ZM13 8.99986H11V11.9999H8V13.9999H11V16.9999H13V13.9999H16V11.9999H13V8.99986Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
