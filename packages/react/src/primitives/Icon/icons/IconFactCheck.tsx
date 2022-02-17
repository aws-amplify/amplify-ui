import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconFactCheck } from '@aws-amplify/ui-react';` → `import { MdFactCheck } from 'react-icons/md';`
 */
export const IconFactCheck = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconFactCheck');
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
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M20 3H4C2.9 3 2 3.9 2 5V19C2 20.1 2.9 21 4 21H20C21.1 21 22 20.1 22 19V5C22 3.9 21.1 3 20 3ZM20 19H4V5H20V19Z"
          fill="currentColor"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M19.41 10.42L17.99 9L14.82 12.17L13.41 10.75L12 12.16L14.82 15L19.41 10.42Z"
          fill="black"
        />
        <path d="M10 7H5V9H10V7Z" fill="black" />
        <path d="M10 11H5V13H10V11Z" fill="black" />
        <path d="M10 15H5V17H10V15Z" fill="black" />
      </svg>
    </View>
  );
};
