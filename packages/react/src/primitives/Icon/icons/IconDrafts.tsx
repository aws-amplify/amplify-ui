import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconDrafts } from '@aws-amplify/ui-react';` → `import { MdDrafts } from 'react-icons/md';`
 */
export const IconDrafts = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconDrafts');
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
          d="M21.99 8C21.99 7.28 21.62 6.65 21.05 6.3L12 1L2.95 6.3C2.38 6.65 2 7.28 2 8V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18L21.99 8ZM19.99 8V8.01L12 13L4 8L12 3.32L19.99 8ZM4 18V10.34L12 15.36L19.99 10.37L20 18H4Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
