import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconDeck } from '@aws-amplify/ui-react';` → `import { MdDeck } from 'react-icons/md';`
 */
export const IconDeck = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconDeck');
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
          d="M22 9L12 2L2 9H11V22H13V9H22ZM12 4.44L15.66 7H8.34L12 4.44Z"
          fill="currentColor"
        />
        <path
          d="M4.14018 12L2.18018 12.37L3.00018 16.74V22H5.00018L5.02018 18H7.00018V22H9.00018V16H4.90018L4.14018 12Z"
          fill="black"
        />
        <path
          d="M19.1 16H15V22H17V18H18.98L19 22H21V16.74L21.82 12.37L19.86 12L19.1 16Z"
          fill="black"
        />
      </svg>
    </View>
  );
};
