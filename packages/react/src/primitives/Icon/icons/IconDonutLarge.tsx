import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconDonutLarge } from '@aws-amplify/ui-react';` → `import { MdDonutLarge } from 'react-icons/md';`
 */
export const IconDonutLarge = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconDonutLarge');
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
          d="M13 5.0798C16.06 5.5198 18.48 7.9398 18.92 10.9998H21.95C21.48 6.2798 17.72 2.5198 13 2.0498V5.0798V5.0798ZM18.92 12.9998C18.48 16.0598 16.06 18.4798 13 18.9198V21.9498C17.72 21.4798 21.48 17.7198 21.95 12.9998H18.92V12.9998ZM11 18.9198C7.61 18.4298 5 15.5198 5 11.9998C5 8.4798 7.61 5.5698 11 5.0798V2.0498C5.95 2.5498 2 6.8098 2 11.9998C2 17.1898 5.95 21.4498 11 21.9498V18.9198V18.9198Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
