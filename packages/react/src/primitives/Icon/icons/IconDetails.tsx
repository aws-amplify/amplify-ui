import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconDetails } from '@aws-amplify/ui-react';` → `import { MdDetails } from 'react-icons/md';`
 */
export const IconDetails = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconDetails');
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
          d="M12 3L2 21H22L12 3ZM13 8.92L18.6 19H13V8.92ZM11 8.92V19H5.4L11 8.92Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
