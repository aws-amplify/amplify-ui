import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconVerticalAlignCenter } from '@aws-amplify/ui-react';` → `import { MdVerticalAlignCenter } from 'react-icons/md';`
 */
export const IconVerticalAlignCenter = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconVerticalAlignCenter');
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
          d="M8 19H11V23H13V19H16L12 15L8 19ZM16 5H13V1H11V5H8L12 9L16 5ZM4 11V13H20V11H4Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
