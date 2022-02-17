import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconWidgets } from '@aws-amplify/ui-react';` → `import { MdWidgets } from 'react-icons/md';`
 */
export const IconWidgets = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconWidgets');
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
          d="M16.66 4.51994L19.49 7.34994L16.66 10.1799L13.83 7.34994L16.66 4.51994V4.51994ZM9 4.99994V8.99994H5V4.99994H9ZM19 14.9999V18.9999H15V14.9999H19ZM9 14.9999V18.9999H5V14.9999H9ZM16.66 1.68994L11 7.33994L16.66 12.9999L22.32 7.33994L16.66 1.68994ZM11 2.99994H3V10.9999H11V2.99994ZM21 12.9999H13V20.9999H21V12.9999ZM11 12.9999H3V20.9999H11V12.9999Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
