import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconForward } from '@aws-amplify/ui-react';` → `import { MdForward } from 'react-icons/md';`
 */
export const IconForward = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconForward');
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
          d="M14 8.83L17.17 12L14 15.17V14H6V10H14V8.83ZM12 4V8H4V16H12V20L20 12L12 4Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
