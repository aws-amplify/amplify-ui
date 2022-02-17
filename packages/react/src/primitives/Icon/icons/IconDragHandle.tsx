import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconDragHandle } from '@aws-amplify/ui-react';` → `import { MdDragHandle } from 'react-icons/md';`
 */
export const IconDragHandle = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconDragHandle');
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
        <path d="M20 9H4V11H20V9ZM4 15H20V13H4V15Z" fill="currentColor" />
      </svg>
    </View>
  );
};
