import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconToll } from '@aws-amplify/ui-react';` → `import { MdToll } from 'react-icons/md';`
 */
export const IconToll = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconToll');
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
          d="M15 4C10.58 4 7 7.58 7 12C7 16.42 10.58 20 15 20C19.42 20 23 16.42 23 12C23 7.58 19.42 4 15 4ZM15 18C11.69 18 9 15.31 9 12C9 8.69 11.69 6 15 6C18.31 6 21 8.69 21 12C21 15.31 18.31 18 15 18ZM3 12C3 9.39 4.67 7.17 7 6.35V4.26C3.55 5.15 1 8.27 1 12C1 15.73 3.55 18.85 7 19.74V17.65C4.67 16.83 3 14.61 3 12V12Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
