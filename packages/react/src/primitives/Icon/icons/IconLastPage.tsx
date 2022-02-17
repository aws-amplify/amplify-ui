import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconLastPage } from '@aws-amplify/ui-react';` → `import { MdLastPage } from 'react-icons/md';`
 */
export const IconLastPage = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconLastPage');
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
          d="M5.58984 7.41L10.1798 12L5.58984 16.59L6.99984 18L12.9998 12L6.99984 6L5.58984 7.41ZM15.9998 6H17.9998V18H15.9998V6Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
