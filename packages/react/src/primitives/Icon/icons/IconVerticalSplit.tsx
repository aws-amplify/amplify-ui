import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconVerticalSplit } from '@aws-amplify/ui-react';` → `import { MdVerticalSplit } from 'react-icons/md';`
 */
export const IconVerticalSplit = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconVerticalSplit');
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
          d="M3 13H11V15H3V13ZM3 17H11V19H3V17ZM3 9H11V11H3V9ZM3 5H11V7H3V5ZM19 7V17H15V7H19ZM21 5H13V19H21V5Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
