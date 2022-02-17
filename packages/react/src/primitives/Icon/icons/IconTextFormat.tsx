import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconTextFormat } from '@aws-amplify/ui-react';` → `import { MdTextFormat } from 'react-icons/md';`
 */
export const IconTextFormat = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconTextFormat');
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
          d="M5 17V19H19V17H5ZM9.5 12.8H14.5L15.4 15H17.5L12.75 4H11.25L6.5 15H8.6L9.5 12.8ZM12 5.98L13.87 11H10.13L12 5.98Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
