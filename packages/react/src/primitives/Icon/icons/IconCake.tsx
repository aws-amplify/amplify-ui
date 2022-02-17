import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconCake } from '@aws-amplify/ui-react';` → `import { MdCake } from 'react-icons/md';`
 */
export const IconCake = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconCake');
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
          d="M12 6C13.11 6 14 5.1 14 4C14 3.62 13.9 3.27 13.71 2.97L12 0L10.29 2.97C10.1 3.27 10 3.62 10 4C10 5.1 10.9 6 12 6ZM18 9H13V7H11V9H6C4.34 9 3 10.34 3 12V21C3 21.55 3.45 22 4 22H20C20.55 22 21 21.55 21 21V12C21 10.34 19.66 9 18 9ZM19 20H5V17C5.9 16.99 6.76 16.63 7.4 15.99L8.49 14.92L9.56 15.99C10.87 17.3 13.15 17.29 14.45 15.99L15.53 14.92L16.6 15.99C17.24 16.63 18.1 16.99 19 17V20V20ZM19 15.5C18.49 15.49 18.01 15.3 17.65 14.93L15.52 12.8L13.38 14.93C12.64 15.67 11.35 15.67 10.61 14.93L8.48 12.8L6.34 14.93C5.99 15.29 5.51 15.49 5 15.5V12C5 11.45 5.45 11 6 11H18C18.55 11 19 11.45 19 12V15.5Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
