import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconDonutSmall } from '@aws-amplify/ui-react';` → `import { MdDonutSmall } from 'react-icons/md';`
 */
export const IconDonutSmall = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconDonutSmall');
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
          d="M14.82 10.9998H21.95C21.48 6.2798 17.72 2.5198 13 2.0498V9.1798C13.85 9.4898 14.51 10.1498 14.82 10.9998ZM15 4.5798C17 5.3998 18.6 6.9998 19.42 8.9998H15.99C15.71 8.6298 15.37 8.2898 15 8.0098V4.5798V4.5798ZM2 11.9998C2 17.1898 5.95 21.4498 11 21.9498V14.8198C9.84 14.3998 9 13.2998 9 11.9998C9 10.6998 9.84 9.5998 11 9.1798V2.0498C5.95 2.5498 2 6.8098 2 11.9998ZM9 4.5798V8.0198C7.77 8.9398 7 10.4098 7 11.9998C7 13.5898 7.77 15.0598 9 15.9898V19.4298C6.04 18.2398 4 15.3498 4 11.9998C4 8.6498 6.04 5.7598 9 4.5798ZM13 14.8198V21.9498C17.72 21.4798 21.48 17.7198 21.95 12.9998H14.82C14.51 13.8498 13.85 14.5098 13 14.8198ZM15 15.9898C15.37 15.7098 15.71 15.3798 15.99 14.9998H19.42C18.6 16.9998 17 18.5998 15 19.4198V15.9898V15.9898Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
