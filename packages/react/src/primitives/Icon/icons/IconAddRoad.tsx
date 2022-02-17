import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconAddRoad } from '@aws-amplify/ui-react';` → `import { MdAddRoad } from 'react-icons/md';`
 */
export const IconAddRoad = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconAddRoad');
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
          d="M20 18V15H18V18H15V20H18V23H20V20H23V18H20Z"
          fill="currentColor"
        />
        <path d="M20 4H18V13H20V4Z" fill="black" />
        <path d="M6 4H4V20H6V4Z" fill="black" />
        <path d="M13 4H11V8H13V4Z" fill="black" />
        <path d="M13 10H11V14H13V10Z" fill="black" />
        <path d="M13 16H11V20H13V16Z" fill="black" />
      </svg>
    </View>
  );
};
