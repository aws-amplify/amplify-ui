import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconPresentToAll } from '@aws-amplify/ui-react';` → `import { MdPresentToAll } from 'react-icons/md';`
 */
export const IconPresentToAll = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconPresentToAll');
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
          d="M21 3H3C1.89 3 1 3.89 1 5V19C1 20.11 1.89 21 3 21H21C22.11 21 23 20.11 23 19V5C23 3.89 22.11 3 21 3ZM21 19.02H3V4.98H21V19.02ZM10 12H8L12 8L16 12H14V16H10V12Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
