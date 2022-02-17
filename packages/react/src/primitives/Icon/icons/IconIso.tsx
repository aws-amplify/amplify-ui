import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconIso } from '@aws-amplify/ui-react';` → `import { MdIso } from 'react-icons/md';`
 */
export const IconIso = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconIso');
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
          d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM5.5 7.5H7.5V5.5H9V7.5H11V9H9V11H7.5V9H5.5V7.5ZM19 19H5L19 5V19ZM17 17V15.5H12V17H17Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
