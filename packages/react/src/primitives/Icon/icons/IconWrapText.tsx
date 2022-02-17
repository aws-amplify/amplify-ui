import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconWrapText } from '@aws-amplify/ui-react';` → `import { MdWrapText } from 'react-icons/md';`
 */
export const IconWrapText = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconWrapText');
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
          d="M4 19H10V17H4V19ZM20 5H4V7H20V5ZM17 11H4V13H17.25C18.35 13 19.25 13.9 19.25 15C19.25 16.1 18.35 17 17.25 17H15V15L12 18L15 21V19H17C19.21 19 21 17.21 21 15C21 12.79 19.21 11 17 11Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
